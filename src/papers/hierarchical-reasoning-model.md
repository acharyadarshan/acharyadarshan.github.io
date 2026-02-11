---
title: "Hierarchical Reasoning Model (Wang et al., 2025)"
authors: "Wang et al., 2025"
week: "8/31/2025~9/6/2025"
order: 4
---

<p>
                            Structure consists of a High (H, the “meta-planner”) and Low (L, the “worker”) module; in
                            each step, H provides a high-level plan and L runs for \(
                            T\) steps and returns final result to H, which then creates a new plan which is done for \(
                            N\) rounds. At the start of each new H cycle, the L module is reset to begin a fresh
                            computational phase under the updated H context (rather than carrying forward its
                            previous-cycle state). This reset enables <i>hierarchical convergence</i>: within a cycle, L
                            converges to a local equilibrium conditioned on the current H state; when H updates, it
                            changes the context and L is reset to converge again toward a different equilibrium. The
                            result is a sequence of distinct, stable sub-computations across cycles that sustains high
                            computational activity over \(
                            N T\) steps and yields substantial effective depth.
                        </p>
                        <p>
                            Training is done by computing gradients only through the final local updates (a 1-step
                            fixed-point approximation inspired by DEQ/IFT, not BPTT) and passing through an output head,
                            which is the resulting output of the HRM. Deep supervision is used across segments: each
                            full \(
                            N T\)-step “segment” gets its own loss, and the hidden state is detached before the next
                            segment so gradients do not flow across segments (still \(
                            O(1)\) memory). Both H and L modules are transformer blocks. In practice, the encoder-only
                            blocks use RoPE, GLU, and RMSNorm in a post-norm setup with no linear biases; parameters are
                            initialized with truncated LeCun initialization, and stablemax can replace softmax in
                            small-sample regimes. Optimization uses Adam-atan2 with warm-up and a constant learning
                            rate. Task/data augmentation is applied (e.g., linear symmetries) to reduce overfitting to
                            spurious signals.
                        </p>
                        <p>
                            The model also has an Adaptive Computation Time (ACT) module that evaluates how many steps
                            are needed to complete the task; ACT predicts two Q-values \((\hat Q_{\text{halt}}, \hat
                            Q_{\text{continue}})\) and halts when \(\hat Q_{\text{halt}} \ge \hat Q_{\text{continue}}\)
                            once a (randomized) minimum number of segments is met, or when a maximum cap is reached. ACT
                            is a Q-learning head and trained in a very simple feedback loop of 1 if the answer is
                            correct when halting and 0 otherwise. A small probability forces longer “thinking” by
                            sampling a larger minimum segment count; this improves exploration. Despite using plain
                            Q-learning without replay buffers or target networks, training remains stable due to bounded
                            parameters from weight decay (AdamW-style behavior), post-norm RMSNorm, and the regularizing
                            effect of deep supervision.
                        </p>
                        <p>
                            A \(\sim 27\)M-parameter HRM trained from scratch (no pretraining, no CoT supervision)
                            achieves 40.3% on ARC-AGI evaluation, surpassing o3-mini-high (34.5%) and Claude 3.7 8k
                            (21.2%). It also achieves near-perfect accuracy on hard Sudoku (Sudoku-Extreme Full) and
                            solves optimal \(30 \times 30\) maze paths where CoT methods fail. Observed behavior over
                            intermediate timesteps aligns with task structure: on Sudoku, the model exhibits
                            depth-first-search-like trial-and-error with backtracking; on Maze, it shows parallel
                            exploration \(\rightarrow\) pruning \(\rightarrow\) refinement; on ARC, it makes gradual
                            hill-climbing edits. Moreover, HRM supports inference-time scaling: accuracy can improve at
                            test time simply by increasing \(M_{\max}\) to allow more segments, without retraining
                            (especially effective on Sudoku). Also note that this model is a specialist (when trained on
                            Sudoku, it will only be tested on Sudoku).
                        </p>
                        <p>
                            Finally, the learned representations display a <i>dimensionality hierarchy</i> paralleling
                            neuroscientific findings: the Participation Ratio (effective dimensionality) of the
                            high-level states \(z_H\) is substantially larger than that of the low-level states \(z_L\)
                            after training (approximately a threefold ratio, and scaling with task diversity), whereas
                            an untrained HRM shows no such separation. This mirrors cortical hierarchies reported in
                            neuroscience and supports the planner/executor role split emerging from training rather than
                            architecture alone.
                        </p>

                        <b>Addendum</b>
                        <ul>
                            <li>
                                By Francois Chollet (<a href="https://x.com/fchollet/status/1956442449922138336">link
                                    1</a>, <a href="https://arcprize.org/blog/hrm-analysis">link 2</a>): it has been
                                suggested externally that the outer-loop decision made by ACT was a key driver for
                                success and that task augmentation was very important. Note that these are external
                                interpretations rather than ablations reported in the paper itself; the paper attributes
                                the results to the combination of hierarchical convergence, the 1-step gradients with
                                deep supervision, and ACT, alongside augmentation.
                            </li>
                        </ul>