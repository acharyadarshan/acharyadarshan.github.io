---
title: "Large Language Models are Better Reasoners with Self-Verification (Weng et al., 2023)"
authors: "Weng et al., 2023"
week: "Before September 2025"
order: 39
---

<p><strong>Keywords:</strong> self-verification, reasoning</p>
                        <p>
                            Proposes self-verification:
                        <ol>
                            <li>LLM generates multiple answers (Forward Reasoning).</li>
                            <li>Masks factual information in the input question and asks the LLM to answer the masked
                                part (Backward Verification) \(k\) times.
                            </li>
                            <li>Answer in FR with the most consistency (out of \(k\) times, how many times was the
                                correct information recovered) is chosen as answer.
                            </li>
                        </ol>
                        Model performance is slightly increased for LLMs, does not work for smaller models.
                        Also combined this with self-consistency and other methods and shows performance can be slightly
                        increased.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                A bit misleading: it doesn't show that LLMs can self-verify, they show that they can use
                                a "trick" using LLMs to improve performance on reasoning questions.
                                Moreover, don't agree that this is "self-verification": their approach is simply Wang et
                                al. (2023) but slightly more complicated. The model itself is not verifying its own
                                answer.
                            </li>
                            <li>
                                Don't believe this method can be applied to slightly more complicated questions than
                                GSM8K. This method assumes that the questions are "simple enough" such that they are
                                correctly answerable most of the time (because their "Backward Verification" is
                                essentially doing the same thing as "Forward Reasoning").
                            </li>
                        </ul>
                        </p>