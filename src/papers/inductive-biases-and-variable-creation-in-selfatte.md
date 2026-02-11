---
title: "Inductive Biases and Variable Creation in Self-Attention Mechanisms (Edelman et al., 2022)"
authors: "Edelman et al., 2022"
week: "Before September 2025"
order: 6
---

<p>
                            Focuses on studying the inductive biases of attention heads that they denote "sparse
                            variable creation" to explain the empirically observed good generalizability of
                            self-attention (especially w.r.t. context length, although this may be debatable in
                            practice).
                        </p>
                        <b>
                            Construction
                        </b>
                        <p>
                            First, the paper defines an attention head in general terms. Given an input sequence of
                            \(T\) tokens represented by the matrix \(X\) and a context vector \(z\), the output \(y\) is
                            expressed as
                            \[
                            y = \phi_\text{out}\Biggl( \sum_{t=1}^{T} \,\text{softmax}\bigl(\text{sim}(x_t,
                            z)\bigr)\cdot \phi_\text{in}(x_t) \Biggr),
                            \]
                            where \(\text{sim}(\cdot, \cdot)\) is typically the inner product. In standard
                            self-attention, \(\text{sim}(x_t, z)\) and \(\phi_\text{in}(x_t)\) correspond to
                            \((W_Q\,x_i)\cdot(W_K\,x_t)\) and \(W_V\,x_t\) (with \(x_i\) being one of the tokens),
                            respectively. For simplicity (as in many related works), the feedforward MLP is ignored in
                            this construction.
                        </p>
                        <b>
                            Results
                        </b>
                        <p>
                            Theorem 4.1 uses a covering number argument to show that when we impose norm constraints on
                            the weights, the effective complexity of the self-attention selection (covering number of
                            the class of attention heads) grows only as \(\log T\)---i.e., a bounded-norm attention head
                            "prefers" to depend on only a small number of tokens rather than the full length-\(T\)
                            sequence.
                        </p>
                        <p>
                            First, it is shown that the softmax function has a bounded Jacobian. Namely, the Jacobian
                            \(J(z)\) for softmax has entries
                            \[
                            J(z)_{ij} = \text{softmax}(z)_i \Bigl(\delta_{ij} -\text{softmax}(z)_j\Bigr),
                            \]
                            where \(\delta_{ij}\) is the Kronecker delta. Because the softmax outputs are probabilities,
                            one can show that each row of the Jacobian has its sum of absolute values bounded by a
                            constant, e.g., the sum of the absolute values in the \(i\)-th row is
                            \[
                            \sum_{j=1}^T \bigl|J(z)_{ij}\bigr|
                            = \text{softmax}(z)_i \Biggl[ \Bigl(1-\text{softmax}(z)_i\Bigr) + \sum_{j \neq i}
                            \text{softmax}(z)_j \Biggr].
                            \]
                            Since
                            \[
                            \sum_{j \neq i} \text{softmax}(z)_j = 1 -\text{softmax}(z)_i,
                            \]
                            the sum becomes
                            \[
                            2\,\text{softmax}(z)_i \Bigl(1-\text{softmax}(z)_i\Bigr),
                            \]
                            which does not depend on \(T\). Since the maximum of the function \(x(1-x)\) on \([0,1]\) is
                            \(1/4\), the maximum row sum is at most \(2 \times \frac{1}{4} = \frac{1}{2}\).
                        </p>
                        <p>
                            Then, using the mean value theorem,
                            \[
                            \|\text{softmax}(z) -\text{softmax}(z')\|_1 \leq L_{\text{softmax}}\, \|z -z'\|_\infty,
                            \]
                            where \(L_{\text{softmax}}\) is determined by the norm of the Jacobian and is a constant
                            independent of \(z\).
                        </p>
                        <p>
                            From there, standard covering number arguments can be applied under the Lipschitz constant
                            of \(L_{\text{softmax}}\) to obtain the (upper) bound
                            \[
                            \log \mathcal{N}_\infty \leq \frac{C}{\epsilon^2} \cdot \log(mT),
                            \]
                            where the constant \(C\) depends on the norm bounds of the weight matrices and the Lipschitz
                            constants of the functions \(\phi_{\mathrm{in}}\) and \(\phi_{\mathrm{out}}\), and where
                            \(m\) denotes the number of training samples (as we are covering over \(mT\) points).
                        </p>