---
title: "Learning principled bilingual mappings of word embeddings while preserving monolingual invariance (Artetxe et al., 2016)"
authors: "Artetxe et al., 2016"
week: "Before September 2025"
order: 19
---

<p><strong>Keywords:</strong> cross-lingual alignment, linear transformation, orthogonal
                            transformation
                        </p>
                        <p> Direct follow-up to Xing et al. (2015). Combines the optimization
                            objectives of Xing et al. (2015) and Faruqui and Dyer (2014). Evaluates word embeddings and
                            the learned transformation on translational similarity (How close the mapped vector from
                            language \(A\) is to the word in language \(B\) with "same" meaning.) and word embeddings
                            only
                            on analogy solving task.
                        <ul>
                            <li>
                                Length-normalization is not important over orthogonal matrix.
                            </li>
                            <li>
                                Adds mean centering constraint to optimization and states the optimization is equivalent
                                to Faruqui and Dyer (2014) but does not alter monolingual embeddings manually.
                            </li>
                        </ul>
                        </p>