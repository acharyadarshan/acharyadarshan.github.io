---
title: "Understanding Position Bias Effects on Fairness in Social Multi-Document Summarization (Olabisi et al., 2024)"
authors: "Olabisi et al., 2024"
week: "Before September 2025"
order: 54
---

<p>
                            Investigates position bias in multi-document summarization for text from multiple dialects
                            in social settings. Most
                            position bias studies do not assess fairness. Uses DivSumm with three dialects in source
                            text, considering randomly shuffled versus ordered documents. Shows that:
                        <ul>
                            <li>
                                Reference summaries lack word overlap bias.
                            </li>
                            <li>
                                Abstractive models show no word overlap bias when documents are shuffled but favor
                                earlier parts when ordered.
                            </li>
                        </ul>
                        Position bias is conditional: models favor early text only when linguistically similar. Semantic
                        similarity between shuffled/ordered cases also measured; when ordered, summaries are biased
                        toward the first dialect group.
                        </p>
                        <p><strong>Thoughts:</strong> Unclear how semantic similarity is measured (mentions only cosine
                            similarity).
                        </p>