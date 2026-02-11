---
title: "Pay Attention to MLPs (Liu et al., 2021)"
authors: "Liu et al., 2021"
week: "Before September 2025"
order: 12
---

<p>
                            This paper studies the necessity of self-attention layers in transformers by proposing a new
                            architecture called gMLP, which incorporates cross-token interactions but does not utilize
                            self-attention layers. Given input \(X \in \mathbb{R}^{N\times d}\), one vanilla gMLP layer
                            is written as:
                            \[
                            \Big(\sigma(XU) \odot (W \sigma(XU) + b) \Big) V + X,
                            \]
                            where \(X\in \mathbb{R}^{n\times d}\) is the input to the layer, \(\sigma(\cdot)\) denotes
                            an activation function, and \(U, V, W\in \mathbb{R}^{n\times n}\) are learnable parameters
                            (no special constraints). They refer to the element-wise product
                            \[
                            s(\cdot) = \sigma(XU) \odot f_{W, b}(X) = \sigma(XU) \odot (W \sigma(XU) + b)
                            \]
                            as the "spatial gating unit," hence the "g" in "gMLP." The "mixing" part is handled by
                            the \(W\) matrix and \(W, b\) need to be initialized to near-zero and all-ones matrix for
                            empirical training stability.
                            It is also shown that when one additional self-attention module is included in gMLP in the
                            form:
                            \[
                            s(\cdot) = \sigma(XU) \odot \big( (W \sigma(XU) + b) + A(X) \big)
                            \]
                            where \(A(X)\) denotes one self-attention head, then better performance than both
                            transformers and gMLP is achievable.
                        <ul>
                            <li>gMLP performs better on vision tasks than transformers with same number of parameters
                                and training time.
                            </li>
                            <li>gMLP trained on masked language modeling objective has better pre-training perplexity
                                than BERT, and does comparably to BERT on NLP tasks that do not require cross-lingual
                                alignment.
                            </li>
                            <li>gMLP requires a scalar multiple (~3) of the number of parameters to match BERT's
                                performance on natural language tasks that require pairwise attention.
                            </li>
                        </ul>
                        Punchline: This architecture is arguably simpler than self-attention and achieves comparable
                        performance on vision tasks, but not on natural language tasks that require token mixing.
                        <br />
                        -&gt; Perhaps self-attention is comparably "cost-efficient" in terms of parameters?
                        </p>