---
title: "Are Girls Neko or Shōjo? Cross-Lingual Alignment of Non-Isomorphic Embeddings with Iterative Normalization (Zhang et al., 2019)"
authors: "Zhang et al., 2019"
week: "Before September 2025"
order: 30
---

<p><strong>Keywords:</strong> cross-lingual alignment</p>
                        <p> Considers method to preprocess static word embeddings to ensure
                            applying an orthogonal transformation between language embeddings with different structures
                            is suitable. The method is simply iteratively normalizing the word vectors then centering
                            them until convergence. Performance boosts on word translation accuracy is most significant
                            in distant languages (Japense, Chinese) whereas increase in similar, high-resource languages
                            (Spanish) are minimal.
                            Iterative normalization strongly boosts word translation performance for distant languages
                            than English.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                What about other tasks besides word translation?
                            </li>
                            <li>
                                Does the same idea hold for contextualized embeddings?
                            </li>
                        </ul>
                        </p>