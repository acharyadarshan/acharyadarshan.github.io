---
title: "The Impact of Positional Encoding on Length Generalization in Transformers (Kazemnejad et al., 2023)"
authors: "Kazemnejad et al., 2023"
week: "Before September 2025"
order: 3
---

<p>
                            It is well-known that transformers often fail to extrapolate to longer sequence lengths than
                            those they were trained on (i.e., length generalization), and positional encodings (PE)
                            appear to be crucial in this limitation. This paper examines the role of positional encoding
                            (APE, T5's Rel, ALiBi, Rotary) in this problem in decoder-only Transformers.
                            <br />
                            Using synthetic tasks (Copy, Reverse, Addition, Summation, Polynomial Evaluation, Sorting,
                            Parity, LEGO, SCAN, PCFG), they train on examples up to length \(L\) and test on examples up
                            until length \(2L\) while evaluating with exact-match accuracy.
                            <br />
                            They show that:
                        <ul>
                            <li>
                                All tested PEs and NoPE (no positional encoding) perform near-perfect in-distribution,
                                but commonly used PEs often fail at length generalization (with T5's Relative Bias
                                performing best on unseen longer lengths. More specifically, T5 \(&gt;\) ALiBi \(&gt;\)
                                APE, Rotary).
                            </li>
                            <li>
                                Using a constructive argument, they show that a single attention head (i.e., the first
                                layer) can count the position in an absolute positional manner.
                                Using these absolute positions and once they are in the hidden state, a relative
                                position bias can also be emulated. As measured via distributional dissimilarity
                                (Jensen-Shannon divergence), the manner in which NoPE has chosen to distribute attention
                                strongly resembles T5's Relative PE scheme.
                            </li>
                            <li>
                                No positional encoding ften outperforms all PEs.
                            </li>
                            <li>
                                Chain-of-thought only sometimes helps with length extrapolation, but do not make the
                                choice of PE irrelevant.
                            </li>
                        </ul>
                        </p>