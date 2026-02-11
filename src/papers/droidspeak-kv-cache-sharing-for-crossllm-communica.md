---
title: "DroidSpeak: KV Cache Sharing for Cross-LLM Communication and Multi-LLM Serving (Liu et al., 2024)"
authors: "Liu et al., 2024"
week: "9/7/2025~9/14/2025"
order: 1
---

<p>
                            Studies the feasibility of KV-cache reuse/transfer between two models that are fine-tuned
                            from
                            the same base model. Shows that ~10% of layers are critical for quality preservation when
                            reusing another model's cache. Proposed approach (<code>DroidSpeak</code>) achieves
                            ~4\(\times\)
                            throughput and 3.1\(\times\) faster prefill with negligible quality loss across QA,
                            summarization, and
                            coding.
                        </p>

                        <b>Method</b>
                        <p>
                            Compute “critical layers” by testing each layer in isolation: for layer \(\ell\), reuse only
                            that layer's KV from sender model and recompute all other layers on receiver model, then
                            measure
                            the drop from receiver's full-prefill baseline. Simply recomputing only the critical layers
                            when
                            scattered (e.g., 16-18, 20, 25-27) creates multiple reuse→recompute transitions, which both
                            introduce OOD residual/embedding inputs for the next receiver layer and require loading the
                            sender's E cache at each transition, which is large and expensive, and this transition
                            injects
                            mismatch error that propagates.
                            To avoid this, instead recompute a contiguous block that covers critical layers (e.g.,
                            recompute
                            16-27 as one block in the previous example) and reuse KV elsewhere. Shows that this
                            “critical”
                            designation is stable enough to profile once and reuse (i.e., the layers that are critical
                            are
                            similar across prompts).
                        </p>

                        <b>Results</b>
                        <p>
                            Across eight model pairs, ~11% of layers are marked critical using a threshold like &gt;10%
                            F1
                            drop versus the receiver's baseline. Variance across inputs is low for non-critical layers
                            and
                            concentrated in the most critical ones, which is why a small training slice (e.g., 50
                            HotpotQA
                            contexts) suffices to learn the pattern for a given pair.
                        </p>
                        <p>
                            Empirically, prefill latency drops by 1.7-3.1\(\times\) at near-baseline quality. TTFT, TBT,
                            and
                            overall
                            E2E latency also improve and yield ~4\(\times\) throughput at a fixed SLO under Poisson
                            arrivals. Naive
                            full KV reuse is faster upfront but suffers large quality losses.
                            Also experimentally shown to apply beyond standard long-context QA: reports gains on
                            summarization, coding, multi-agent coding workflows, and MoE models (reuse still helps
                            because
                            KV lives in attention while expert routing happens later). Profiles learned on one dataset
                            also
                            transfer well to others from the same pair (due to stability as mentioned before), with
                            average
                            quality differences around a couple of points on matched Pareto configurations.
                        </p>