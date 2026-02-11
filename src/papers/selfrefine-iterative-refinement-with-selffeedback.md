---
title: "Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)"
authors: "Madaan et al., 2023"
week: "Before September 2025"
order: 36
---

<p><strong>Keywords:</strong> iterative refinement, self-feedback</p>
                        <p>
                            Proposes self-refine: Get LLM output, ask itself for feedback, and get new LLM output with
                            original output and feedback as input. Evaluated on wide range of tasks.
                            Results: Adding feedback (even non-specific ones, e.g., "make the code more efficient")
                            significantly boosts performance (10~30%) across three tasks, and using more informative
                            feedback increases performance a bit more. Performance increases as more iterations of
                            self-refine are run. Comparing self-refine to generating \(k\) different outputs, humans
                            still
                            preferred self-refine outputs more than all \(k\) outputs. Self-refine does not work for
                            relatively smaller models (~13B, e.g., Vicuna-13b.)
                            When self-refine fails to improve original output, the majority cause is because of
                            incorrect feedback. Self-refine still works when feedback is partially incorrect.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Not clarified what the stop condition is (which is later "exposed" in Huang et al.
                                (2023)).
                            </li>
                            <li>
                                Unclear whether self-refine works in other languages (mentioned in Limitations section).
                                Perhaps the capability to self-refine only emerges given sufficient data? Do
                                multilingual models have the same property or not?
                            </li>
                        </ul>
                        </p>