---
title: "How Multilingual is Multilingual BERT? (Pires et al., 2019)"
authors: "Pires et al., 2019"
week: "Before September 2025"
order: 27
---

<p><strong>Keywords:</strong> cross-lingual transfer, contextualized embeddings</p>
                        <p>mBERT performs well on zero-shot POS tagging across languages that
                            have similar typographical properties (even when the tokens are not the same) but poorly on
                            different languages. When considering an alternate representation of a language (e.g., Hindi
                            written in Latin), the model fails. When a language trained in one script (e.g., Hindi) is
                            tested on an alternate script (i.e., Devanagari), the model performs comparably well as the
                            original language. Model performance on translation is seen to be maximized when the
                            contextualized representations of the middle layers of the model are used (authors attribute
                            diminsihing performance of later layers to no fine-tuning).
                        <ul>
                            <li>
                                mBERT--BERT trained on masked language modeling objective for 104 languages--can
                                generalize a fine-tuned task (e.g., NER) to a different language.
                            </li>
                            <li>
                                Transferability diminishes as language typographic similarity decreases, i.e.,
                                syntactic structure is the main source of information necessary for mBERT to perform
                                zero-shot inference.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Perhaps OOD generalization for syntactically similar languages indicate the model is
                                learning some form of a generalized parser?
                            </li>
                        </ul>
                        </p>