---
title: "On a model of associative memory with huge storage capacity (Demircigil et al., 2017)"
authors: "Demircigil et al., 2017"
week: "Before September 2025"
order: 2
---

<p>
                            The paper addresses associative memory models and how many patterns can be reliably stored
                            and retrieved in a generalized Hopfield-like network.
                        </p>
                        <p style="color: gray;">
                            <strong>Hopfield Network ("Neurons that fire together wire together").</strong>
                            An \(N\)-node fully-connected network where each node (neuron) can take values in \(\{-1,
                            +1\}\). Given \(M\) patterns (each one an \(N\)-length bit-string denoted by
                            \(\{\xi^\mu\}_{\mu=1}^M\)) we want to "memorize"/"program" these patterns into the network.
                            The interaction (synaptic) strength between nodes \(i\) and \(j\) is defined as
                            \[
                            J_{ij} \;=\; \sum_{\mu=1}^M \; \xi_i^\mu \, \xi_j^\mu,
                            \]
                            where \(\xi_i^\mu\) is the \(i\)-th component of the \(\mu\)-th pattern.
                            <br />
                            The Hopfield energy of a configuration \(\sigma = (\sigma_1, \ldots, \sigma_N)\) is
                            \[
                            H(\sigma) = -\sum_{i&lt; j} J_{ij}\sigma_i \sigma_j,
                            \]
                            where \(J_{ij} = J_{ji}, J_{ii} = 0\).
                            <br />
                            Taking the derivative of \(H(\sigma)\), we run the update rule (synchronously or
                            asynchronously) for neuron \(i\) in configuration \(\sigma=(\sigma_1,\ldots,\sigma_N)\) as
                            \[
                            T_i(\sigma)
                            \;=\;
                            \mathrm{sign}\!\Bigl(\sum_{j=1}^N J_{ij}\,\sigma_j\Bigr),
                            \]
                            which becomes the value of node \(i\) at the next time step.
                            This iterative process continues until the network converges (i.e., reaches a stable state).
                            The Hopfield energy decreases or stays the same whenever a neuron updates its state
                            according to this rule (i.e., \(H(\sigma)\) acts as a Lyapunov function) and the network
                            converges to a local minimum.
                        </p>
                        <p>
                            Stable configurations of the Hopfield dynamics correspond to local minima of \(H(\sigma)\),
                            and hence the patterns that the network is designed to store naturally appear as local
                            minima: when we start the network close to one of these minima (i.e., configurations within
                            a certain "radius of attraction" around a stored pattern), it will tend to settle into said
                            closest pattern after repeated updates.
                        </p>
                        <p>
                            <strong>Under Exact Stability vs. Allowing Errors.</strong>
                            When no errors are desired (i.e., each stored pattern is exactly stable), we cannot do
                            better than \(M\sim N/\log N\) (specifically, we can store \(M\approx C\,N/\log N\) patterns
                            such that a fixed pattern is stable w.h.p. if \(C &lt; 1/2\)).
                            If we allow a small fraction of errors in the retrieved state, we can push \(M\) up to
                            \(\alpha N\) for some \(\alpha &lt; 0.138\).
                            Thus, exact stability of all stored patterns imposes more stringent capacity constraints,
                            whereas permitting a fraction of spins to be incorrect lets us store more patterns without
                            destabilizing retrieval.
                        </p>
                        <p>
                            <strong>Pushing Beyond the \(N / \log N\) Bound.</strong>
                            This paper attempts to push beyond the \(N / \log N\) bound for when we want every pattern
                            to be exactly stable by modifying the network's interaction function. Concretely, the
                            generalized Hopfield energy form can be written as (cf. Krotov-Hopfield Generalized Model):
                            \[
                            T_{i}(\sigma) = \mathrm{sign}\!\Bigl(\sum_{\mu=1}^M
                            \bigl[ F\bigl(\xi^\mu_i + \sum_{j\neq i} \xi^\mu_j \sigma_j\bigr)
                            \;-\;
                            F\bigl((-1) \cdot \xi^\mu_i + \sum_{j\neq i} \xi^\mu_j \sigma_j\bigr)
                            \bigr]\Bigr),
                            \]
                            where setting \(F(x)=x^2\) reduces to the classical Hopfield model.
                            <br />
                            The motivation is that the classical energy function changes too slowly near stored
                            patterns, which limits storage capacity (intuition: the "pull" toward a stored pattern is
                            relatively weak in the classical Hopfield energy, so the network cannot reliably correct
                            errors when too many patterns are stored). A higher-order or exponential function can cause
                            the network to more sharply lock onto a correct pattern, thereby improving capacity while
                            preserving a non-negligible basin of attraction for each stored pattern.
                        </p>
                        <p>
                            Hence, the paper first considers an alternative \(F(x) = x^n\), which can be shown to push
                            the capacity from \(\sim N\) to \(\sim N^{n-1}\).
                            This result can also be framed in the so-called \(n\)-spin generalization (i.e., products of
                            \(n\) different spins at once in the network's energy).
                            They show that as \(n\) grows, one can store superlinear numbers of patterns (e.g., up to
                            \(N^{n-1}\), up to constants and logarithmic factors), yet each pattern remains associative.
                        </p>
                        <p>
                            As a natural extension to polynomials, the paper focuses on the case \(F(x) = e^x\) (the
                            exponential function can be written as a formal power series \(e^x = \sum_{k=0}^\infty
                            x^k/k!\)). Using a large-deviation/Cramer argument, they show that we can store \(M =
                            \exp(\alpha N) + 1\) patterns for \(\alpha &lt; \log(2)/2\), when allowing a fraction \(\rho
                            &lt; 1/2\) of corrupted spins. More specifically, if the network starts from a configuration
                            that differs from a stored pattern in \(\rho N\) spins, it still recovers that pattern
                            w.h.p. when \(\alpha &lt; \frac{ I(1-2\rho)}{2}\), where \(I(x) =
                            \tfrac{1}{2}\bigl((1+x)\log(1+x) + (1-x)\log(1-x)\bigr)\).
                            <br />
                            In words, exponential interactions allow storing exponentially many patterns, and each
                            pattern can correct a finite fraction of errors, and no "associativity collapse" occurs.
                        </p>
                        <p>
                            In essence, by tuning \(F(x)\) to be increasingly higher order all the way to \(e^x\), the
                            "signal" from the correct pattern outcompetes the "noise" due to the massive number of other
                            patterns on the order of \(\exp(\alpha N)\), provided \(\alpha\) is below the threshold
                            given by \(I(1-2\rho)/2\). The large-deviation bounds ensure that the overwhelming majority
                            of random crosstalk events do not derail retrieval. Thus, the exponential model pushes the
                            memory capacity to an exponential scale while still guaranteeing an attractive fixed point
                            for each stored pattern.
                        </p>