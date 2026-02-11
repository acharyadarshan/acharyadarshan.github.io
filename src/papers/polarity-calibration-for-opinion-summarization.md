---
title: "Polarity Calibration for Opinion Summarization (Lei et al., 2024)"
authors: "Lei et al., 2024"
week: "Before September 2025"
order: 50
---

<p>
                            Motivation: Authors observe that existing summarization systems amplify polarity bias (the
                            difference in representation between perspectives). Defines an intelligent summarizer as
                            “proportionally presenting both majority and minority opinions and aligning with the input
                            text polarity.” Develops a reward model focusing on three criteria:
                        <ul>
                            <li>
                                Whether the summary's polarity distance matches the input text.
                            </li>
                            <li>
                                Whether the summary's semantic content is faithful (using RoBERTa embeddings).
                            </li>
                            <li>
                                Whether the summary is coherent (using CoLA).
                            </li>
                        </ul>
                        Tested on two domains using automated/human evaluation.
                        </p>