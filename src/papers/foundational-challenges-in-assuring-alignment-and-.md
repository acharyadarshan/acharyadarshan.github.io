---
title: "Foundational Challenges in Assuring Alignment and Safety of Large Language Models (Anwar et al., 2024)"
authors: "Anwar et al., 2024"
week: "Before September 2025"
order: 17
---

(Section 3.4 Only)
                        <p>
                            Existing methods for interpreting model behavior lack faithfulness.
                            This section touches on interpretability-based methods (think mechanistic interpretability)
                            and explainability-based methods (generating natural language explanations).
                            <br />
                            Critical challenges include:
                        <ul>
                            <li><em>Interp. methods assume a priori that internal model reasoning works in specific
                                    ways,
                                    which leads to questionable assumptions.</em>
                                <br />
                                For example, Integrated Gradients, Shapley values assume non-linear behavior can be
                                sufficiently
                                explained with linear models, which turned out to have arbitrarily worse failure cases;
                                interpretabiity of neurons → may be polysemantic; linear probing easily learns spurious
                                features instead of actual features.
                            <li><em>Neural networks do not have incentive to be inherently
                                    interpretable/explainable.</em>
                                <br />
                                Particularly a concern for domains where AI outperforms humans, because explanations
                                that
                                are understandable by humans may not exist/be possible. <b>Representation alignment</b>
                                helps AI
                                models learn human-aligned representations, but works in a human-in-the-loop manner so
                                hard to scale up
                            </li>
                            <li><em>Scalable evaluation of the faithfulness of a generated explanation is hard.</em>
                                <br />
                                Measuring faithfulness requires gaining access to the true underlying internal
                                reasoning, but this is inaccessible (and why we want explainability to begin with).
                                An important direction is that <b>there is a need for benchmarks to standardize metrics
                                    of success and to help create better standards for evaluating explanation
                                    faithfulness.</b> <b>In particular, for detecting alignment failures, metrics that
                                    focus on
                                    worst-case is necesary.</b>
                            </li>
                            <li><em>Desirably identified patterns should lead to modifiable behavior, but unclear how
                                    this can be done.</em>
                            </li>
                            </li>
                        </ul>
                        </p>
                        <p>
                            Challenges for explainability, i.e., externalized reasoning primarily lies in
                            faithfulness and steerability: Attempts to make reasoning visible in a natural language
                            manner (e.g., chain-of-thought-style methods) can be misleading/unfaithful and
                            insensitive to "edits" made to the reasoning.
                            Open questions include:
                        <ul>
                            <li>
                                Understanding to what extent externalized reasoning is causally responsible for improved
                                performance on various reasoning tasks.
                            </li>
                            <li>
                                Understanding the extent to which the training directly or implicitly incentivizes
                                unfaithfulness.
                            </li>
                        </ul>
                        </p>