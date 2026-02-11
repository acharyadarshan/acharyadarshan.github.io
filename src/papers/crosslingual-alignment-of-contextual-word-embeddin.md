---
title: "Cross-Lingual Alignment of Contextual Word Embeddings, with Applications to Zero-shot Dependency Parsing (Schuster et al., 2019)"
authors: "Schuster et al., 2019"
week: "Before September 2025"
order: 26
---

<p><strong>Keywords:</strong> cross-lingual transfer, linear transformation, contextualized
                            embeddings, parsing
                        </p>
                        <p> Considers contextualized word embeddings (from ELMo) and uses
                            anchors (the average of all contextualized embeddings of the same word) as representation
                            for each word. Considers three settings: 1) when dictionary is available, apply standard
                            linear transformation learning methods to anchors, 2) Apply unsupervised learning (as in
                            Artetxe et al. (2017), Conneau (2018), etc.) to anchors, and 3) apply standard linear
                            transformation learning methods to contextualized embeddings.
                            Also considers low-resource target language case, in which they consider adding a
                            regularization term on the Euclidean distance between embeddings from the source and target
                            dictionary.
                        <ul>
                            <li>
                                First paper to use contextualized word embeddings.
                            </li>
                            <li>
                                Model can perform well zero-shot, i.e., train on different language than testing
                                language.
                            </li>
                            <li>
                                Uses anchors to capture one representation for each word.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>Surely we can do more than just apply existing methods for static word embeddings?</li>
                        </ul>
                        </p>