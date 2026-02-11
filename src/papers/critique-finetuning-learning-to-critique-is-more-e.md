---
title: "Critique Fine-Tuning: Learning to Critique is More Effective than Learning to Imitate (Wang et al., 2025)"
authors: "Wang et al., 2025"
week: "9/7/2025~9/14/2025"
order: 2
---

<p>
                            Proposes the idea that further SFT on target labels for capable LLMs already extensively
                            pre-trained on reasoning corpora can be undesirable (and sometimes degrade performance).
                            Considers shifting the training paradigm from “imitation” (maximize probability of
                            generating a
                            correct answer \(y\) given query \(x\), i.e., \(P(y \mid x)\)) to “critique” (maximize
                            probability of generating a critique \(c\) given query \(x\) and noisy response \(y\), i.e.,
                            \(P(c \mid [x; y])\)); underlying premise is that the latent capabilities required to
                            critique
                            (error detection, verification, refinement) transfer to stronger answer generation. Curates
                            critique-focused datasets by modifying WebInstruct, MetaMathQA, and NuminaMath using
                            <code>GPT-4o</code> and <code>GPT-4o-mini</code> to synthesize critiques of original
                            responses.
                            Train strong 7B non-instruction-tuned bases (<code>DeepSeek-Math-7B</code>,
                            <code>Qwen2.5-7B</code>, <code>Qwen2.5-Math-7B</code>) with a simple LM objective on
                            critiques.
                        </p>

                        <b>Results</b>
                        <p>
                            Across six math benchmarks (MATH, Minerva-Math, GSM8K, OlympiadBench, AIME24, AMC23), CFT
                            beats
                            SFT by +4-10 absolute points on average for all three bases. Baselines include
                            WebInstruct-SFT,
                            WebInstruct-verified-SFT, and WebInstruct-GPT-4o-SFT. Notably, CFT is data- and
                            compute-efficient and matches larger SFT systems (e.g., <code>AceMath</code>,
                            <code>Qwen2.5-Math-Instruct</code>, both trained on &gt;2M samples) and matches the average
                            performance of <code>SimpleRL</code> (open <code>DeepSeek-R1</code> replication) that have
                            ~140\(\times\) compute. Interestingly, CFT-trained models also show some benefits OOD, with
                            CFT-trained models outperforming officially instruction-tuned SFT models on general
                            instruction-following benchmarks (MT-Bench, IFEval).
                        </p>

                        <b>Ablations</b>
                        <ul>
                            <li>CFT is robust to dataset/source of noisy responses (WebInstruct performs best under CFT
                                even
                                with higher noise).</li>
                            <li>Stronger teachers help (<code>GPT-4o-1120</code> &gt; <code>GPT-4o-mini</code>) but
                                using
                                mini still yields gains.</li>
                            <li>Mixing high-quality SFT data hurts vs. pure CFT.</li>
                            <li>Controlling sequence length indicates gains are not due to longer trajectories.</li>
                            <li>Inference-time self-critique underperforms direct inference.</li>
                        </ul>