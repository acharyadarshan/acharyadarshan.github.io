---
title: "LM vs. LM: Detecting Factual Errors via Cross Examination (Cohen et al., 2023)"
authors: "Cohen et al., 2023"
week: "Before September 2025"
order: 40
---

<p><strong>Keywords:</strong> factual error detection, cross examination</p>
                        <p>
                            Proposes LM vs. LM as a method to automatically detect factual errors (given factual
                            statement, want to ensure examiner can accurately output whether statement is correct or
                            not):
                        <ol>
                            <li>Input statement to examiner to generate list of follow-up questions.</li>
                            <li>Ask examinee to answer all questions, which the outputs are passed to examiner.
                                (Optional) Examiner is asked whether follow-up questions are required.
                            </li>
                            <li>Given set of examiner questions and examinee answers, examiner checks whether examinee's
                                answers are consistent.
                            </li>
                        </ol>
                        Testing: Used closed-book open-ended datasets. Also created set of "false" claims to test how
                        well LLMs can detect false claims. Results indicate LM vs. LM performs better than existing
                        methods by 5~10%.
                        LM vs. LM fails when examinee provides incorrect but consistent outputs. 9~15% of the
                        time, LLM produces incoherent output. Examinee typically outputs incorrect answers when original
                        statement is false.
                        Not exactly about the self-correcting abilities of LLMs, and more so proposing a method to
                        conduct consistency checks with LLMs.
                        </p>