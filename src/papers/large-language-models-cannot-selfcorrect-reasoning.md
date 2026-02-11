---
title: "Large Language Models Cannot Self-Correct Reasoning Yet (Huang et al., 2023)"
authors: "Huang et al., 2023"
week: "Before September 2025"
order: 41
---

<p><strong>Keywords:</strong> self-correction, reasoning</p>
                        <p>
                            An analytical study that questions previous papers on
                            "self-correction/self-improvement/etc." and examines whether LLMs can self-correct without
                            any form of external feedback (e.g., terminating iterative prompting when model generates
                            correct output, changing prompt instructions because previous prompt didn't work (this is
                            considered external feedback as it leverages info on learning what prompts do not work after
                            testing)). Tests three-step prompting (initial generation, critique previous output,
                            generate response using initial output and critique). Shows that previously reported
                            positive results uses external feedback in some way.
                            Uses datasets from arithmetic reasoning to question answering. Shows that LLM performance
                            decreases under self-correction regime (model is more likely to change correct -&gt;
                            incorrect
                            than vice versa) under no external feedback, which they provide their intuition as "asking
                            the model to assess the model's output might skew the model towards changing its answer."
                            Self-correction is less effective for tasks where LLMs cannot easily identify errors or
                            assess its correctness in its outputs.
                            However, self-correction is useful for altering the text style and improving
                            appropriateness.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Paper suggests that searching within the answer space of the LLM can be done robustly
                                with external feedback (or self-consistency (Wang et al. (2023))). Perhaps we can do
                                even better by employing self-consistency across languages?
                            </li>
                        </ul>
                        </p>