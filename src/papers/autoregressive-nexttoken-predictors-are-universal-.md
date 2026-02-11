---
title: "Auto-Regressive Next-Token Predictors are Universal Learners (Malach, 2024)"
authors: "Malach, 2024"
week: "Before September 2025"
order: 9
---

<p>
                            Classical PAC learning sees only pairs \((x,f(x))\); in AR learning each intermediate token
                            is both input and label, and CoT provides explicit intermediate computation steps.
                            This paper studies the theoretical difference between next‐token prediction
                            (auto‐regressive, AR) and classical supervised learning, i.e., how much of the expressivity
                            of LLMs comes merely from the AR training scheme + CoT supervision rather than from the
                            architecture itself? In essence, they show that even low-expressivity linear AR predictors
                            trained purely to predict next tokens can simulate any Turing-computable function provided
                            they are trained on CoT data with sufficient length (measured via length complexity).
                        </p>

                        <b>Notation</b>

                        <p>
                            Let \(\mathcal{D}\) be a finite token set and denote a context as \(x\in \mathcal{D}^n\),
                            and a CoT sequence as \(z\in \mathcal{D}^T\).
                            An AR function \(h: \mathcal{D}^n \times \mathcal{D}^{ < T} \to \mathcal{D}\) predicts the
                                next token given the context of previous tokens. A hypothesis class \(\mathcal{H}\) of
                                AR functions is said to be AR Learnable if there exists an algorithm that is i.i.d.
                                samples \((x,z)\sim \mathcal{D}\) of length \(T\) returns \(\hat h\in\mathcal{H}\) such
                                that with high probability, \[ \Pr\bigl[\exists\,t\le T:\hat h(x,z_{ < t})\neq z_t
                                \bigr] \le \epsilon. \] If the algorithm runs in time polynomial in \(n\),
                                \(1/\epsilon\), and \(1/\delta\), they term \(\mathcal{H}\) to be efficiently AR
                                Learnable. <br>
                                Define the auto-regressive outputs of \(h\) by
                                \[
                                \begin{aligned}
                                &h^{(1)}(x) = h(x,\emptyset),\\
                                &h^{(t)}(x) = h\bigl(x,h^{(1)}(x),\dots,h^{(t-1)}(x)\bigr).
                                \end{aligned}
                                \]
                                \(h\) is said to compute a target \(f:\mathcal{D}^n\to\mathcal{D}\) if \(h^{(T)}(x) =
                                f(x)\) for all \(x\).
                                <br>
                                The length complexity of learning a concept class \(\mathcal{F}\) with AR class
                                \(\mathcal{H}\) is defined as the minimal \(T\) such that every \(f\in\mathcal{F}\) can
                                be computed by some \(h\in\mathcal{H}\) in \(T\) steps.
                        </p>

                        <b>Main Results</b>

                        <p>
                            <em>Theorem 3.3 (AR Learnability). Suppose each per-step class \(\mathcal{H}_t\) is
                                PAC-learnable with sample complexity \(m(\varepsilon,\delta)\). Then the product class
                                \(\mathcal{H}_1\times\dots\times\mathcal{H}_T\) is AR-learnable with sample complexity
                                \(m(\varepsilon/T,\delta/T)\). </em>
                            <br>
                            Theorem 3.3 indicates that any class that is already easy to PAC-learn (for example linear
                            separators) remains easy when used as AR steps; the only cost is a linear shrink in the
                            accuracy parameter.
                        </p>

                        <p>
                            <em>Theorem 3.6 (Function Approximation). If \(\hat h\) satisfies the AR learning criterion,
                                rolling it out does not amplify error: the distribution of \(\hat h^{(T)}(x)\) converges
                                to that of the true generator \(h^{(T)}(x)\) with the same sample complexity.</em>
                        </p>

                        <p>
                            <em>Theorem 3.8 (Boolean Circuits). Let \(f:\{0,1\}^n\to\{0,1\}\) be computed by a
                                linear-threshold circuit with \(T\) gates.
                                A linear AR predictor can reproduce \(f\) in exactly \(T\) steps.</em>
                            <br>
                            Since any Turing machine running in time \(T(n)\) compiles into such a circuit of size
                            \(\mathrm{poly}(T(n))\), a linear AR model trained on CoT traces of comparable length can
                            simulate any time-\(T(n)\) computation.
                        </p>

                        <p>
                            <em>Theorems 3.11, 3.12 (Parity). For the parity class \(\mathcal{P}_n=\{\chi_A :
                                A\subseteq[n]\}\) defined by \(\chi_A(x)=\sum_{i\in A}x_i\bmod 2\),
                                a linear AR predictor needs only \(O(\log n)\) tokens to compute any member of
                                \(\mathcal{P}_n\).
                                If each AR gate is allowed to compute parity of at most \(k\) bits, the required length
                                is \(\Theta(n/k)\); learning each size-\(k\) gate may cost \(\binom{n}{k}\) time or
                                \(O(k\log n)\) statistical queries, which indicates a length-sample trade-off.</em>
                        </p>

                        <p>
                            In essence, the paper claims that some capabilities credited to deep transformer stacking
                            might arise from the AR+CoT training regime alone.
                        </p>