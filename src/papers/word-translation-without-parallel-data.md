---
title: "Word translation without parallel data (Conneau et al., 2018)"
authors: "Conneau et al., 2018"
week: "Before September 2025"
order: 22
---

<p><strong>Keywords:</strong> cross-lingual alignment, unsupervised, hubness problem</p>
                        <p>
                            Introduces cross-lingual adversarial alignment method that performs on par/better than
                            previous data-dependent methods in an unsupervised setting and a scoring metric to evaluate
                            goodness of transformation during training. Also mitigates hubness problem by considering
                            the same idea as in Artetxe et al. (2017) and introducing CSLS (Intuition: word similarity
                            is discounted by average word similarity with other words of both words. A hub will take a
                            large average word similarity value).
                        <ul>
                            <li>
                                First paper to introduce a fully unsupervised way to learn orthogonal transformations
                                between two language embeddings.
                            </li>
                            <li>
                                Works reasonably well for relatively different languages too (English-Esperanto).
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Does this not assume the embedding space structure of the two languages are very
                                similar? English and Esperanto are arguably relatively similar.
                            </li>
                            <li>
                                Will this still work when the vocabulary size of the two languages are drastically
                                different?
                            </li>
                        </ul>
                        </p>