---
title: "Normalized Word Embedding and Orthogonal Transform for Bilingual Word Translation (Xing et al., 2015)"
authors: "Xing et al., 2015"
week: "Before September 2025"
order: 18
---

<p><strong>Keywords:</strong> Cross-lingual alignment, linear transformation, orthogonal
                            transformation
                        </p>
                        <p> Uses static word embeddings (word2vec-style). Claims Mikolov et al.
                            (2013)'s approach is ill-posed because the same similarity metrics are not used during
                            training and testing. Proposes to length-normalize vectors during training.
                        </p>
                        <ul>
                            <li>
                                First paper to propose the orthogonal transform approach within
                                projection-based methods for cross-lingual alignment.
                            </li>
                            <li>
                                Approach for learning linear projection between embeddings of different dimensions is
                                ad-hoc.
                            </li>
                            <li>
                                Linear projection is learned using data from Google Translate.
                            </li>
                        </ul>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Wonder if unsupervised learning of the projection is possible.
                            </li>
                        </ul>
                        </p>