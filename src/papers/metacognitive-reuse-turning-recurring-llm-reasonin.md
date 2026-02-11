---
title: "Metacognitive Reuse: Turning Recurring LLM Reasoning Into Concise Behaviors (Didolkar et al., 2025)"
authors: "Didolkar et al., 2025"
week: "9/21/2025~9/27/2025"
order: 2
---

<p>
                            Studies the problem of inefficient reasoning in capable LLMs in the sense that generated
                            long CoTs re-derive content that contain the same reasoning patterns from scratch for every
                            new problem. Considers three paradigms that address this:
                        </p>

                        <p>
                        <ul>
                            <li><b>BCI (Behavior-conditioned inference):</b> A pre-compiled <code>behavior_list</code>
                                is
                                created from one dataset (e.g., AIME 2022-23) and relevant behaviors from that list are
                                retrieved by a stronger model (“metacogexpert”) and provided in-context to guide the
                                model
                                when solving a new problem from a different dataset (e.g., AIME 2025).</li>
                            <li><b>Behavior-guided self-improvement:</b> The model generates an initial solution and
                                acts as
                                its own metacogexpert to extract a list of behaviors, then uses this behavior list to
                                generate a solution to the same problem.</li>
                            <li><b>Behavior-conditioned SFT:</b> A powerful model generates reasoning traces using BCI,
                                and
                                a smaller student model is fine-tuned on the (Question, Concise Response) pairs. Goal is
                                to
                                distill the efficient reasoning patterns (that use the behaviors) into the student
                                model's
                                parameters.</li>
                        </ul>

                        </p>

                        <b>Results</b>
                        <p>
                            BCI reduces reasoning trace length by up to 46% while surpassing baseline accuracy on MATH
                            and AIME. Same results hold when scaling to higher token budgets.
                        </p>
                        <p>
                            Behavior-guided self-improvement is more effective than naive self-correction with \(\sim
                            22.2\%\) gain. The performance gap between the behavior-guided method and self-correction
                            grows with token budget, hence adding behaviors helps the model more than simply increasing
                            computation.
                        </p>
                        <p>
                            Behavior-conditioned SFT also performed much better than vanilla SFT despite similar
                            accuracy of ground truth reasoning traces (44.4% vs. 42.7%).
                        </p>

                        <b>Questions</b>
                        <ul>
                            <li>
                                For Behavior-conditioned SFT, does the generated reasoning trace contain statements such
                                as “I will use the skill of \(X\)” or something similar? If not, it would be interesting
                                to understand why simply observing reasoning traces that were generated with behaviors
                                provided is still sufficient to infer the content of the behavior. → Yes. See Table 1.
                                Would be curious to know the ratio that contains explicit mentions of behaviors (likely
                                very high).
                            </li>
                        </ul>