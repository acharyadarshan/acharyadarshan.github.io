---
title: "TinyGSM: achieving >80% on GSM8k with small language models (Liu et al., 2023)"
authors: "Liu et al., 2023"
week: "9/7/2025~9/14/2025"
order: 4
---

<p>
                            Dataset is made with a single prompt that asks <code>GPT-3.5-Turbo</code> to produce new
                            problems plus full Python solutions. The GSM-IC portion is produced by first generating
                            question variants with irrelevant information and then generating Python solutions. Also
                            runs a 13-gram decontamination against the GSM8K test set (22 collisions out of \(\sim
                            11\)M unique questions); note that \(n\)-gram checks are naive and have limitations.
                            Results in \(\sim\)2/3 synthetic GSM8K-style problems and \(\sim\)1/3 GSM-IC-style
                            variants paired with executable Python code solutions.
                        </p>

                        <p>
                            Also fine-tunes small models on the curated synthetic corpus (\(\approx 12.3\)M
                            problems; \(\approx 1.8\)B tokens) and shows strong gains before any verifier (e.g.,
                            <code>Phi-1.5 1.3B</code> improves from \(44.6\%\) to \(68.2\%\) pass@1 on GSM8K;
                            125M-sized version reaches \(63.1\%\)). The key step mentioned is a separate verifier
                            trained on the real GSM8K training set: for each question, the generator samples
                            multiple candidates which are scored with a verifier and the top-scoring answer is
                            selected. With 48 candidates per question, the 1.3B generator plus a 1.3B verifier
                            achieves \(81.5\%\) pass@1 on GSM8K, which beats larger open models. Also transfers
                            reasonably to SVAMP (\(\sim 75.6\%\)) without additional fine-tuning.
                        </p>

                        <p>
                            The verifier is trained sequence-to-sequence with token-level supervision, and benefits
                            from data diversity (multiple checkpoints and temperatures). Scaling the verifier yields
                            larger gains than scaling the generator under a fixed parameter budget.
                        </p>