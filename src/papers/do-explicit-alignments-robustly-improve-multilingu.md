---
title: "Do Explicit Alignments Robustly Improve Multilingual Encoders? (Wu and Dredze, 2020)"
authors: "Wu and Dredze, 2020"
week: "Before September 2025"
order: 32
---

<p><strong>Keywords:</strong> cross-lingual alignment, fine-tuning, mBERT, XLM-R</p>
                        <p> Considers a follow-up work to fine-tuning multilingual LLMs where a
                            contrastive learning objective (weak and strong) are considered. More extensive experiments
                            (in the sense that multiple seeds are used on the same model) are conducted to show existing
                            methods (linear transformation, \(L_2\) alignment (Cao (2020))) do not improve performance
                            over mBERT's representations and contrastive learning marginally improves performance. mBERT
                            is also beat by XLM-R which is trained on more data by 3 points on every task and is further
                            beaten by XLM-R base, indicating that increasing the amount of data and model size is far
                            more effective than existing methods.
                        <ul>
                            <li>
                                Contrastive learning objective marginally improves performance on various tasks (XNLI,
                                NER, ...).
                            </li>
                            <li>
                                Increasing the amount of data and model size improves performance the most.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Can we find a way to achieve same performance with small models (or boost performance of
                                larger models) with better data usage?
                            </li>
                        </ul>
                        </p>