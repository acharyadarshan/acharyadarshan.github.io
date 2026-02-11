---
title: "Offline bilingual word vectors, orthogonal transformations and the inverted softmax (Smith et al., 2017)"
authors: "Smith et al., 2017"
week: "Before September 2025"
order: 20
---

<p><strong>Keywords:</strong> cross-lingual alignment, orthogonal transformation, hubness
                            problem
                        </p>
                        <p>
                            Follow-up work to all orthogonal transformation literature. Shows exisiting methods can be
                            unified into an optimization procedure using SVD. Proves orthogonal transformations are
                            self-consistent (Similarity between words in language A and B should be same as the other
                            way around, i.e. \(S_{i,j} = S_{j, i}\)). Introduces an "inverted softmax" approach to
                            choosing the translated word after a linear map is learned that combats the hubness problem
                            by ensuring hubs (Words that are the nearest neighbor for a lot of words) are not chosen as
                            the translation word with high probability. Also shows a "pseudo-dictionary" (A dictionary
                            between two languages that are created by counting the number of shared characters between
                            two words) is sufficient for achieving comparable (better) performance to supervised (with
                            dictionary) cases.
                            Moreover, instead of learning word-word transformations, a learned sentence-sentence
                            transformation on the word embeddings can fare well on both sentence and word translation.
                        <ul>
                            <li>
                                A pseudo-dictionary is enough to achieve good performance (42% for 1-NN, 59% for 5-NN).
                            </li>
                            <li>
                                Orthogonal transformations learned between word-word and sentence-sentence fare the same
                                performance on word-word translation.
                            </li>
                            <li>
                                When the sentence-sentence transformations are applied to word-word translation, using
                                the inverted softmax greatly boosts performance.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                What's the main difference between this paper and Artetxe et al. (2016)? Seems like the
                                "unifying" part is very similar.
                            </li>
                            <li>
                                Are the linear transformations learned in the word-word case and sentence-sentence case
                                very similar?
                            </li>
                            <li>
                                Surely, pseudo-dictionaries are a very bad source to obtain word correspondences. Is the
                                good performance because of the orthogonal transformation or inverted softmax?
                            </li>
                        </ul>
                        </p>