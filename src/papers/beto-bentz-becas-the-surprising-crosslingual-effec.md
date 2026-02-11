---
title: "Beto, Bentz, Becas: The Surprising Cross-Lingual Effectiveness of BERT (Wu and Dredze, 2019)"
authors: "Wu and Dredze, 2019"
week: "Before September 2025"
order: 29
---

<p><strong>Keywords:</strong> cross-lingual transfer</p>
                        <p> A case study of mBERT on five NLP tasks, extending Pires (2019).
                            Shows that mBERT's representations perform on par with and sometimes better than
                            cross-lingual embeddings. Moreover, shows how mBERT's performances vary depending on which
                            layer's representation is used; shows using later layers' embeddings lead to worse
                            performance. Shows representations of all layers perform well on natural language
                            identification. Shows cross-lingual transfer performance correlates with the number of
                            subtoken overlaps between languages.
                        <ul>
                            <li>
                                mBERT performs on par with cross-lingual alignment methods.
                            </li>
                            <li>
                                Cross-lingual transfer performance depends on subtoken alignment rate.
                            </li>
                            <li>
                                mBERT is good at identifying languages (i.e., representations of different
                                languages are clearly mapped to different sections in the representation space)
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Results slightly differ from Pires (2019); they show cross-lingual transfer performance
                                is good even with completely different tokens. I suppose this study didn't take into
                                account the typography of the language when studying subtoken overlap?
                            </li>
                        </ul>
                        </p>