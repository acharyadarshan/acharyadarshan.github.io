---
title: "Whoever Started the Interference Should End It: Guiding Data-Free Model Merging via Task Vectors (Cheng et al., 2025)"
authors: "Cheng et al., 2025"
week: "9/7/2025~9/14/2025"
order: 3
---

<p>
                            Studies data-free model merging (combine multiple expert models without access to held-out
                            data). Shows via theory that, for linear layers, the update (“task vector”) produced by
                            fine-tuning is approximately a linear combination of the layer inputs; equivalently, the
                            task vector lies within the linear subspace spanned by the input data, which yields an upper
                            bound on interference that depends only on task vectors.
                        </p>

                        <b>Method</b>
                        <p>
                            Proposes <code>WUDI-Merging</code>, which uses this insight and minimizes interference by
                            reducing the projection of the interference vector \(\tau_m - \tau_i\) onto each task's
                            subspace defined by \(\tau_i\) with per-task weighting and a layer-wise objective.
                            Optimization balances tasks by the scale of their vectors (e.g., factors proportional to
                            \(1/\|\tau_i\|_F^2\)) and can be solved efficiently via sequential per-layer gradient
                            descent (alternative closed form exists but is less stable in practice).
                            <code>WUDI-Merging</code> requires no additional held-out data.
                        </p>

                        <b>Results</b>
                        <p>
                            Good results for vision (<code>CLIP ViT-B/32</code>, <code>B/16</code>, <code>L/14</code>;
                            eight datasets) and language (<code>RoBERTa-Base</code>/<code>Large</code> on GLUE;
                            <code>Llama-2</code> for instruction/math/code; LoRA-tuned <code>Flan-T5</code> and
                            <code>Qwen-14B</code>) models for data-free merging, with ~10.9 point gains over prior
                            data-free baselines and beating test-time adaptation methods by ~3.3 points.
                            <code>WUDI-Merging</code> is computationally light (minutes and a few GB of GPU memory).
                            Ablations show that balanced weighting improves robustness, using full task vectors
                            outperforms random or partial subspaces. Improvements are smaller but still SOTA in LoRA
                            settings.
                        </p>