---
title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models (Wang et al., 2023)"
authors: "Wang et al., 2023"
week: "Before September 2025"
order: 35
---

<p><strong>Keywords:</strong> chain-of-thought reasoning, self-consistency</p>
                        <p> Introduces self-consistency method: conduct multiple path decoding
                            for chain-of-thought reasoning and choosing the most consistent final answer by majority
                            vote.
                            Leads to improved accuracy on arithmetic and commonsense reasoning tasks using LLMs (20B ~
                            540B). Robust to sampling (decoding) strategies and imperfect prompts. Self-consistency
                            helps when CoT hurts performance (not stated specifically when this happens).
                            Also attempted using "normalized" (softmaxed) weighted sum w.r.t. decoding probabilities,
                            which provides comparable results to majority vote.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Can consider using weak translators to translate original question to different language
                                and conduct "self-consistency." Weak translators should suffice because this method is
                                said to be robust to prompt quality (or perhaps this is only in English?).
                            </li>
                        </ul>
                        </p>