---
title: "Learning Multilingual Word Embeddings in Latent Metric Space: A Geometric Approach (Jawanpuria et al., 2018)"
authors: "Jawanpuria et al., 2018"
week: "Before September 2025"
order: 25
---

<p><strong>Keywords:</strong> cross-lingual alignment, linear transformation</p>
                        <p> Follow-up work to previous cross-lingual alignment works that
                            employ linear transformation, but multiple language correspondings are learned
                            simultaneously by mapping them into a "latent space." Considers individual orthogonal
                            transformations for each language, then a universal positive definite matrix applied
                            afterwards. Individual transformations and universal matrix are jointly trained. Also
                            considers the low-resource setting where dictionary data is scarce and shows bootstrapping
                            to iteratively improve dictionary achieves on par performance as previous work (Artetxe et
                            al. (2017)).
                        <ul>
                            <li>
                                Can learn transformations between multiple languages simultaneously.
                            </li>
                            <li>
                                Also functions on par with existing approaches in low-resource settings.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Unclear if orthogonal transformations are trained all at once, or each langauge pair is
                                trained individually.
                            </li>
                        </ul>
                        </p>