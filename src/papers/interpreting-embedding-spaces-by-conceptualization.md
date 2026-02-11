---
title: "Interpreting Embedding Spaces by Conceptualization (Simhi and Markovitch, 2023)"
authors: "Simhi and Markovitch, 2023"
week: "Before September 2025"
order: 44
---

<p>
                            Introduces a method to (non-linearly) transform LLM representations into a space where
                            features are interpretable. Uses concepts \(c\) in a pre-defined ontology (Wikipedia) and
                            considers their embeddings \(f(\tau(c))\) (\(\tau(c)\) is the natural language expression of
                            the concept and \(f\) is the LLM embedding of the expression) as independent bases in the
                            transformed space. Given text \(t\), considers \(f(t)\) as its representation. Shows that
                            the transformed representations are A) equivalent in terms of infomation encoded (tested by
                            learning classifiers on top of representations) and B) meaningful in that the concepts are
                            informative of the original sentence.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                (I'm aware that this is already done but) I'm wondering how this can be applied
                                reasonably to author attribution: the difficulty seems to be figuring out reasonable
                                concepts \(c\) for author attribution.
                            </li>
                            <li>
                                I'm curious if these concepts can be obtained in an unsupervised fashion and later
                                interpreted (the assumption is that the concepts are obtained in a way where they are
                                (somehow) constrained to be more interpretable).
                            </li>
                        </ul>
                        </p>