---
title: "Representation Degeneration Problem in Training Natural Language Generation Models (Zhao et al., 2023)"
authors: "Zhao et al., 2023"
week: "Before September 2025"
order: 63
---

<p>
                        <ul>
                            <li>Studies geometry of embedding matrix for weight-tied transformer model</li>
                            <li>The embeddings of words that do not occur will minimize loss when norm is very large
                                (tends to infinity)
                            </li>
                            <li>(Not strictly pointed out) Embeddings are dominated by first few singular components
                            </li>
                            <li>Adding simple regularization term to minimize average cosine similarity mitigates RDP
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>The paper indicates push-pull on Zipfian data causes anisotropy. Why not test this out
                                on (synthetic) uniformly generated sequence?
                            </li>
                            <li>How did the anisotropy change? Provide some numbers? (even sth as simple as
                                average cosine similarity, not just SVD plots)
                            </li>
                            <li>Why is RDP even an issue---if insufficient signals for softmax is the concern, why
                                can we not just scale all values by some large constant? They do show performance
                                increase by adding the regularization term, but it isn't clear if mitigating RDP
                                directly led to the performance increase.
                            </li>
                            <li> What was the point of comparing geometry with NNs and Word2vec if
                                they aren't even going to compare downstream task performance? These (more or less)
                                satisfy isotropy better, but do they perform better or worse than transformers?
                            </li>
                        </ul>
                        </p>