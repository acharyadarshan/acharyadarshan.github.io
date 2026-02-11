---
title: "Do Transformers Parse while Predicting the Masked Word? (Zhao et al., 2023)"
authors: "Zhao et al., 2023"
week: "Before September 2025"
order: 11
---

<p><strong>Keywords:</strong> PCFG, masked language modeling, inside-outside algorithm, parse
                            tree
                        </p>
                        <p>
                            This paper theoretically analyzes the empirical observation that contextual embeddings
                            obtained from attention-based models (e.g., BERT) trained with masked language modeling
                            objective somewhat encode parse tree information. Previous empirical studies show that this
                            encoding can use semantic cues in natural language to falsely indicate that the embeddings
                            contain syntax parsing information. This paper removes semantics from the equation by using
                            strings generated with PCFGs as data.
                        <ul>
                            <li>There exists a transformer architecture (for both hard and soft attention) that
                                implements the Inside-Outside algorithm to recover parse trees for PCFGs. But, the
                                number of layers and dimensions required is unrealistic.
                            </li>
                            <li>They consider \textit{approximating} the Inside-Outside algorithm with transformers,
                                which yields a more realistic-size transformer architecture without losing too much
                                performance.
                            </li>
                            <li>For a PCFG, the Inside-Outside algorithm yields the optimal solution for the masked
                                language modeling objective.
                            </li>
                            <li>
                                Experimentally, they use a linear probe and show:
                                <ul>
                                    <li>the contextual embeddings capture the structure of the constituency parse trees.
                                    </li>
                                    <li>the intermediate-layer representations of the transformer can be used to predict
                                        marginal probabilities computed in the Inside-Outside algorithm.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        Punchline: To implement inside-outside algorithm perfectly w/ transformer architecture, a lot of
                        layers is needed. But transformers can approximate inside-outside algorithm with realistic
                        number of layers.
                        </p>