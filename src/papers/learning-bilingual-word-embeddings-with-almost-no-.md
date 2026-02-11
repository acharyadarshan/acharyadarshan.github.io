---
title: "Learning bilingual word embeddings with (almost) no bilingual data (Artetxe et al., 2017)"
authors: "Artetxe et al., 2017"
week: "Before September 2025"
order: 21
---

<p><strong>Keywords:</strong> cross-lingual alignment, bilingual lexicon induction</p>
                        <p> Using previous methods that learn a linear transformation,
                            considers a bootstrapping method using a very small dictionary and iteratively improving it
                            by retraining and regenerating a word-word dictionary by choosing nearest neighbor of
                            transformed vectors. The learned transformation tends to be the same regardless of starting
                            dictionary, and observed errors are very similar to that of Artetxe et al. (2016).
                        <ul>
                            <li>
                                Bootstrapping from a very small (~25 word pairs) dictionary performs as well as
                                using a large dictionary.
                            </li>
                            <li>
                                Using very small starting dictionary leads to similar final dictionary as Artetxe et al.
                                (2016) indicates that learning a transformation in an unsupervised manner could be
                                possible.
                            </li>
                            <li>
                                However, (while not mentoned in the paper) performance does correlate with the
                                similarity between the two languages.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                This likely does not work on two very different languages, because the text embeddings
                                learned in the languages likely take a very different structure.
                            </li>
                            <li>
                                At each time step, are we using all words as anchors or only the most "confident" words?
                            </li>
                        </ul>
                        </p>