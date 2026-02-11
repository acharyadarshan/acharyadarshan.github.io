---
title: "RNNs are not Transformers (Yet): The Key Bottleneck on In-context Retrieval (Wen et al., 2024)"
authors: "Wen et al., 2024"
week: "Before September 2025"
order: 5
---

<p>
                            Transformers can directly "look up" tokens anywhere in the context via self-attention, which
                            can be expensive memory-wise for long inputs.
                            Contrastingly, RNNs (SSMs, RWKV, etc.) maintain a fixed-size hidden state, which limits
                            their in-context retrival capabilities from far back in the sequence.
                            The chief claim of the paper is that the inability of RNNs to do in-context retrieval is the
                            key reason for their inability to match Transformers on certain algorithmic/reasoning tasks
                            even with Chain-of-Thought (CoT). The paper examines solutions that can fix this gap, such
                            as adding retrieval calls (via regular expressions) to an RNN so it can explicitly retrieve
                            relevant parts of the sequence whenever it wants, or appending one Transformer layer on top
                            of the RNN's output. The paper uses a commonly observed setup (standard architecture,
                            \(p=O(\log n)\)-bit precision for context length \(n\)).
                        </p>
                        <p>
                            The paper first examines the effect of augmenting RNNs with CoT reasoning (cf. Section 4)
                            and show that CoT does give RNNs extra power (Theorem 4.1) but this alone is insufficient to
                            do what Transformers do on tasks that require long-range retrieval (Indexing, Associative
                            Recall, \(c\)-gram Retrieval, Counting, and IsTree (deciding if a graph is a tree)).
                            The former is done via proving that if <span style="font-variant: small-caps;">PSPACE</span>
                            \(\notin\) <span style="font-variant: small-caps;">P/poly</span> then RNN + CoT can do tasks
                            that RNN alone cannot. Informally, they show that an RNN is essentially a small circuit that
                            only "observes" the input once without CoT, which indicates that it cannot handle tasks that
                            require "large circuits." With CoT, the RNN can unroll a longer sequence of internal states
                            a la simulating a small Turing machine in CoT, which allows RNNs to solve <span
                                style="font-variant: small-caps;">PSPACE</span>-level tasks.
                            The latter is done by showing that an RNN with fewer than \(n\) bits of hidden state cannot
                            solve these tasks regardless of the number of CoT steps allowed, whereas a constant-size
                            Transformer can solve them easily. Intuitively, if the allowed memory is too small
                            (sublinear in \(n\)), the RNN does not have sufficient bits to store the tokens to retrieve,
                            and hence cannot retrieve arbitrary items from a large context regardless of how
                            sophisticated the reasoning chain is.
                            On the other hand, a transformer can look back at any token with attention and does not
                            suffer from the same limitation.
                            In particular, it seems like using the <span style="font-variant: small-caps;">IsTree</span>
                            problem as a testbed (given a graph (in tokenized form), identify whether the graph is a
                            binary tree) is a key contribution of the paper.
                            Solving <span style="font-variant: small-caps;">IsTree</span> requires checking connectivity
                            and acyclicity, which are essentially "global" properties that require the model to
                            "retrieve" arbitrary edges from the input.
                            Using <span style="font-variant: small-caps;">IsTree</span>, they show that an RNN with
                            fewer than \(n\) bits of memory cannot solve IsTree even with CoT, but a constant-size
                            Transformer can with CoT that essentially runs DFS.
                            The paper also shows that Transformers are strictly more expressive than RNNs in that there
                            exist tasks where Transformers with only \(O(\log n)\) parameters are more expressive than
                            any RNN of sublinear memory.
                        </p>
                        <p>
                            Given the above limitation, they examine two approaches to close this gap (Section 5). The
                            first is an "oracle retriever" that allows the RNN to magically identify the location of
                            particular parts of the input and retrieve them. The second (and arguably a more "realistic"
                            approach) is appending a one-layer attention layer to the output of the RNN, which
                            effecively implements this retrieval mechanism (i.e., the RNN processes the sequence in one
                            pass and the single attention layer can be used to go back and pick out relevant tokens).
                        </p>