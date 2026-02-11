---
title: "Hallucination, Monofacts, and Miscalibration: An Empirical Investigation (Miao and Kearns, 2025)"
authors: "Miao and Kearns, 2025"
week: "Before September 2025"
order: 16
---

Focuses on testing the theoretical result by Kalai and Vempala, 2024.
                        Concretely, if an LM is calibrated, then no matter how the model is trained, it must hallucinate
                        at least as often as the fraction of
                        arbitrary facts in its training data (i.e., the "monofact" rate) minus miscalibration rate.
                        Tests this hypothesis in two settings: Bigram models (synthetic movie-fact sequences) and
                        in-context learning with Gemini on synthetic data. Shows that the result holds in practice both
                        for simpler models and real LLMs. Proposes to instead of aggressively deduplicating training
                        data, one might re-introduce carefully chosen duplicates post-training to reduce hallucinations
                        without harming overall performance.