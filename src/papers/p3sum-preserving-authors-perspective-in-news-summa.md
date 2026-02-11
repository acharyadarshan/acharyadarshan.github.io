---
title: 'P\(^3\)SUM: Preserving Author''s Perspective in News Summarization with Diffusion Language Models (Liu et al., 2024)'
authors: "Liu et al., 2024"
week: "Before September 2025"
order: 49
---

<p>
                            Motivation: Perspective-preserving summarization is understudied; LLMs might be politically
                            biased, and thus, summarization systems built on top of these LLMs will propagate bias. This
                            study evaluates the aptitude of LLMs to preserve political stances in summaries. It shows
                            LLMs struggle to preserve the author's perspective for summarization. Proposes P\(^3\)SUM, a
                            diffusion model-based political stance summarizer:
                        <ol>
                            <li>Train diffusion model on standard summarization data.</li>
                            <li>
                                At each step:
                                <ol>
                                    <li>Generated output's stance is evaluated with a political stance classifier and
                                        compared to the target stance.
                                    </li>
                                    <li>Steers summary towards the target stance.</li>
                                </ol>
                            </li>
                        </ol>
                        P\(^3\)SUM doesn't require training on perspective summarization data due to the diffusion model
                        backbone. Its performance on ROUGE/abstractiveness suffers marginally while performing
                        significantly better on perspective summarization.
                        </p>