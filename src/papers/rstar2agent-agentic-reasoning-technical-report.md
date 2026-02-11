---
title: "rStar2-Agent: Agentic Reasoning Technical Report (Shang et al., 2025)"
authors: "Shang et al., 2025"
week: "8/31/2025~9/6/2025"
order: 2
---

<p>
                            Examines moving beyond long CoT to agentic RL. Identifies two pains: environment noise
                            (syntax/logic errors, timeouts, formatting drift) that bloats trajectories and, under
                            outcome-only rewards, still gets reinforced when the final answer is right; and systems
                            scale (tens of thousands of tool calls per batch, heavily imbalanced multi-turn rollouts)
                            that crushes GPU utilization.
                        </p>

                        <p>
                            Builds an isolated, high-throughput code-execution service that reliably handles ~45K
                            concurrent tool calls per step with ~0.3 s end-to-end latency, and a load-balanced rollout
                            scheduler that assigns work by available KV cache and dispatches tool calls asynchronously,
                            preventing cache evictions and idle GPUs. Offloads slow answer verification to the service.
                            Trains on 64\(\times\)MI300X in roughly a week.
                        </p>

                        <p>
                            Uses multi-turn rollouts with a structured interface: the model emits
                            <code>&lt;tool_call&gt;{…}&lt;/tool_call&gt;</code> JSON (e.g.,
                            <code>"execute_python_code_with_standard_io"</code>), the environment returns
                            <code>&lt;tool_response&gt;…&lt;/tool_response&gt;</code> containing
                            stdout/outputs/errors/timeouts, and the prompt enforces
                            <code>&lt;reason&gt;…&lt;/reason&gt;</code> followed by exactly one
                            <code>&lt;answer&gt;…&lt;/answer&gt;</code> with the final numeric in
                            \(\boxed{\text{answer}}\) for
                            verification.
                        </p>

                        <p>
                            Introduces GRPO-RoC, retaining answer-only rewards \(r_i \in \{0,1\}\) while changing
                            rollout selection. For each prompt, sample \(2G\) trajectories, then keep \(G\): failures
                            are uniformly subsampled to preserve diverse errors; successes are quality-biased by
                            sampling inversely to a penalty score \(p_{\text{total}} = p_{\text{err}} +
                            p_{\text{format}}\). Here \(p_{\text{err}} = (\# \text{error tool calls}) / (\# \text{tool
                            calls})\), default 0.5 if no tools (to encourage tool usage); \(p_{\text{format}} = 1\) if
                            no <code>&lt;answer&gt;</code>, else \(\min(1, (answers - 1)/turns)\) to penalize multiple
                            answers. Successes are then sampled with probability inversely proportional to
                            \(p_{\text{total}}\), so cleaner traces with fewer tool errors and proper formatting are
                            more likely to be reinforced. This preserves the simplicity of outcome-only verification
                            while biasing learning toward effective, concise, and well-structured tool use. Also adopts
                            exploration tweaks with no KL penalty, no entropy term, and Clip-Higher
                            (\(\varepsilon_{\text{high}} = 0.28\)). Relative to DAPO (pure CoT RL with outcome-only
                            reward and Clip-Higher), this pushes training signal toward cleaner, properly formatted,
                            tool-using successes without step-level shaping.
                        </p>

                        <p>
                            Training recipe is compute-lean. First, a non-reasoning SFT on <code>Qwen3-14B-Base</code>
                            to teach formatting and tool use: 165K function calling (ToolACE-11K, APIGen-MT-5K,
                            Glaive-FC-v2-101K, +48K Magicoder converted to JSON), 30K instruction following (Tulu3,
                            responses rewritten), 27K chat (LLaMA-Nemontron, prompts rewritten); trained 3 epochs (LR
                            5e-6, 4% warmup, cosine, batch 128). Then RL on integer-answer math to enable reliable
                            verification: 17K DAPO, 93K AoPS (OpenMathReasoning), 937 Project Euler, cleaned to 42K by
                            removing unverifiable/complex or extreme outputs and requiring consistency across multiple
                            samples. Three stages: Stage-1 at 8K max response length on all 42K (encourages concision);
                            Stage-2 at 12K on the same set; Stage-3 at 12K on a 17.3K “hard” subset (drop problems
                            solved 8/8 by the latest policy). RL settings: oversample 32, keep 16 via RoC; temperature
                            1.0; \(T=10\) turns (Stages 1-2), \(T=15\) (Stage 3); batch 512; AdamW LR 1e-6; total 510
                            steps.
                        </p>

                        <p>
                            Finds frontier-level math with shorter traces: <code>rStar2-Agent-14B</code> reaches
                            MATH-500 97.8%, AIME24 80.6%, AIME25 69.8%, HMMT'25 52.7%. Responses are compact (avg tokens
                            on AIME24/25 ≈ 9339.7/10943.4) versus <code>DeepSeek-R1-Zero</code> (14246.8/17132.9),
                            <code>QWQ-32B</code> (11868.4/15865.4), <code>Qwen3-14B</code> (14747.6/17521.9). Despite
                            math-only RL, generalizes: GPQA-Diamond 60.9% (vs <code>DeepSeek-V3</code> 59.1), BFCL v3
                            60.8, IFEval 83.4, Arena-Hard 86.6.
                        </p>

                        <p>
                            Ablations show GRPO-RoC &gt; vanilla GRPO+Tool &gt; DAPO. GRPO-RoC reduces the share of
                            tool-error-containing positives over training (where vanilla GRPO plateaus), shortens
                            average training responses, and improves AIME24/25 throughout. On <code>Qwen2.5-32B</code>,
                            outperforms ZTRL and ReTool despite using only non-reasoning SFT (e.g., AIME24/25 69.4/57.3
                            vs 56.7/33.3 for ZTRL and 67.0/49.3 for ReTool at ~700 steps).
                        </p>

                        <p>
                            Reports negative results that justify the minimalist design. Overlong filtering (dropping
                            truncated rollouts) increased truncation and removed a useful negative signal; keeping
                            truncations with explicit zero reward drove the model to de-repeat and self-regulate length.
                            n-gram repetition penalties suppressed legitimate verification loops (rerunning similar code
                            with new inputs), reducing length but harming accuracy. Answer-only rewards plus RoC struck
                            the best balance between exploration, robustness, and simplicity.
                        </p>

                        <p>
                            Analyzes behavior via token entropy: observes classic high-entropy “forking tokens” that
                            prompt self-reflection and branching, and newly prominent high-entropy “reflection tokens”
                            triggered by tool feedback (diagnosing errors, retrying, validating). Tool-call code tokens
                            are mostly low entropy, consistent with prior code pretraining; the high-entropy mass sits
                            on deciding how to react to environment signals, i.e., the “smarter” part.
                        </p>

                        <p>
                            Notes a capacity ceiling: training beyond the best checkpoint (~step 510) led to collapse
                            not fixed by higher temperature, longer max length, more tool turns, larger clip range, or
                            optimizer resets, suggesting RL efficiently saturated the base model's reasoning capacity
                            rather than extending it.
                        </p>