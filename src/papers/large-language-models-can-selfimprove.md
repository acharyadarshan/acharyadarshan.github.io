---
title: "Large Language Models Can Self-Improve (Huang et al., 2022)"
authors: "Huang et al., 2022"
week: "Before September 2025"
order: 38
---

<p><strong>Keywords:</strong> self-improvement, chain-of-thought, self-consistency</p>
                        <p>Proposes \emph{Language Model Self-Improved} (LMSI): Given unlabeled
                            questions, use CoT reasoning and "self-consistency" to generate labels and fine-tune model
                            on this pseudolabeled data.
                            Tested on 540B model. Improves performance on both in-domain tasks (tasks where unlabeled
                            data is taken from) and OOD tasks (marginally). Pseudolabeled data prompts are diversified
                            by using four possible templates to prevent model from producing only one style of output.
                            Also studied augmenting data. Training on self-generated data increases performance but not
                            as well as training on existing data.
                            Also tried distilling. 8B distilled model beats 62B model and 62B distilled model beats 540B
                            model. Unclear which dataset is used for this.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>Does training in language \(A\) boost performance in language \(B\) using LMSI?</li>
                        </ul>
                        </p>