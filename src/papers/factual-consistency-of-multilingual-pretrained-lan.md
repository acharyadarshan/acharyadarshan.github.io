---
title: "Factual Consistency of Multilingual Pretrained Language Models (Fierro et al., 2022)"
authors: "Fierro et al., 2022"
week: "Before September 2025"
order: 34
---

<p>
                            "Builds” mPaRaRel dataset by translating PaRaRel (38 types of cloze-style questions with ~9
                            paraphrased templates) into 45 languages. Tests monolingual consistency in different
                            languages with mBERT (110M) and XLM-RoBERTa (560M). Shows other languages have worse
                            consistency than English, which has already been shown to be monolingually inconsistent.
                            Consistency is measured simply by the total number of matches across all templates (i.e., if
                            the answer is the same for two queries that are paraphrases of each other, this is
                            considered to be consistent). Shows results for accuracy, consistency, and
                            consistency-accuracy (ones that are both consistent and accurate).
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>Only investigates monolingual consistency in different languages. Very different from
                                cross-lingual consistency.
                            </li>
                        </ul>
                        </p>