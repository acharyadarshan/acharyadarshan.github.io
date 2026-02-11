---
title: "A Formal Model of Hierarchical Concept-Learning (Rivest and Sloan, 1994)"
authors: "Rivest and Sloan, 1994"
week: "Before September 2025"
order: 10
---

<p>
                            Focuses on extending Valiant-style PAC framework to a "hierarchical concept learning"
                            setting where a complex target concept is broken into a sequence of simpler sub-concepts
                            that are learned one after another with later concepts allowed to call the earlier ones as
                            building blocks. More concretely, hierarchical concept learning is defined as the following
                            learning regime:
                        <ol>
                            <li>Start with primitive predicates that depend only on the raw input features</li>
                            <li>Define a slightly richer predicate that may invoke the primitive predicates</li>
                            <li>Continue stacking more expressive predicates until the top layer produces the final
                                classification of interest</li>
                        </ol>
                        A "hierarchy" is this ordered list of predicates (in learning theory terms, a straight-line
                        program). This hierarchy essentially acts as an explicit CoT and can also be seen as a precursor
                        of modern selective-classification and CoT in LLMs.
                        </p>

                        <p>
                            Concretely, consider Boolean vectors \(x\in\{0,1\}^n\) drawn from a fixed underlying
                            distribution \(\mathcal{D}\). The target concept is a size-\(s\) circuit composed of
                            \(\mathsf{AND}\), \(\mathsf{OR}\) and \(\mathsf{NOT}\) gates. A teacher reveals a
                            straight-line program \(y_1,\ldots, y_s\) whose final line \(y_s\) equals the target itself.
                            During lesson \(i\) the teacher samples an input \(x\sim \mathcal{D}\) and supplies the
                            label \(y_i(x)\) to the learner. The learner must output a classifier \(Q\colon
                            X\to\{0,1,\bot\}\) that never mislabels an example on which it predicts 0 or 1 and, w.p. at
                            least \(1-\delta\), abstains on no more than an \(\varepsilon\) fraction of \(\mathcal{D}\).
                            After each lesson the learner maintains a version space \(F_i\) consisting of all formulas
                            for gate \(i\) still consistent with the observed data (see "Coherent-Set Learner" below).
                        </p>

                        <p>
                            This alternate regime transforms learning poly-size Boolean
                            circuits into a "reliable" (never wrong when it makes a prediction) and "probably useful"
                            (abstaining on at most an \(\varepsilon\) fraction of the input distribution w.p.
                            \(1-\delta\)) task. The paper shows that the required number of labelled examples is only
                            polynomial in the natural parameters (\(O\bigl((s/\varepsilon)(\log
                            K+\log(s/\delta))\bigr)\)). The paper also demonstrates a concept class learnable in this
                            hierarchical setting but not learnable in classical PAC theory (under routine cryptographic
                            assumptions).
                        </p>

                        <b>Coherent-Set Learner (\(\mathsf{CSL}\))</b>

                        <p>
                            In the paper, each step is processed via \(\mathsf{CSL}\), which works as follows:
                        <ol>
                            <li>Draw fresh inputs until
                                \[
                                m_i \;=\;\frac{1}{\varepsilon_i}\Bigl(\ln K + \ln\frac{1}{\delta_i}\Bigr)
                                \]
                                coherent samples are collected, where \(K\) is the explicit bound on the single-gate
                                hypothesis class and \(\varepsilon_i,\delta_i\) are the accuracy/confidence budgets
                                allocated to this stage.</li>
                            <li> Prune the version space \(F_i\): discard every formula \(h\in F_i\) that disagrees
                                with even one of those \(m_i\) labelled samples.</li>
                        </ol>
                        By the finite-class PAC theorem, each remaining formula errs on fewer than \(\varepsilon_i\)
                        of the coherent input distribution w.p. at least \(1-\delta_i\).
                        <br>
                        They consider a "Reliable Learner" which processes the gates in order and uses
                        \(\mathsf{CSL}\) with \(\varepsilon_i=\varepsilon/(sK)\) and \(\delta_i=\delta/(2s)\). It can be
                        shown that the single-gate hypothesis class has cardinality at
                        most \(K\le 8\binom{n+s-1}{2}+2\), so each run of \(\mathsf{CSL}\) is polynomial in \(n\),
                        \(s\), \(1/\varepsilon\) and \(\log(1/\delta)\).
                        </p>

                        <b>Main Results</b>

                        <p>
                            <em>
                                Theorem 1 (Finite-Class PAC Bound). If a hypothesis class \(\mathcal{H}\) is finite,
                                then
                                \[
                                m \;=\;\frac{1}{\varepsilon}\Bigl(\ln\lvert \mathcal{H}\rvert +
                                \ln\frac{1}{\delta}\Bigr)
                                \]
                                uniformly-random labelled examples suffice to ensure that every
                                \(h\in\mathcal{H}\) consistent with the sample errs on fewer than an
                                \(\varepsilon\) fraction of the underlying distribution with probability at least
                                \(1-\delta\).
                            </em>
                        </p>
                        <p>
                            The above theorem tells us the required number of coherent examples before all predicates
                            that mislabel one of them can be safely removed with the guarantee that the survivors are
                            \(\varepsilon_i\)-accurate.
                            However, this theorem is useless unless we can actually collect the required number \(m_i\)
                            of coherent examples. The following Lemma shows this happens with overwhelming probability;
                            hence, the algorithm does not stall due to lack of data.
                        </p>

                        <p>

                            <em>
                                Lemma 2 (Coherent-Sample Guarantee). Assuming the accuracy condition for gates \(1\)
                                through
                                \(i-1\), \(\mathsf{CSL}\) obtains its required coherent sample set with probability at
                                least
                                \(1-\delta/(2s)\).
                            </em>
                        </p>

                        <p>
                            By the inductive hypothesis, earlier gates are already \(\varepsilon/(sK)\)-accurate, so on
                            a fresh input they all agree with probability at least \(1-\varepsilon/s\). Treating
                            incoherence as a Bernoulli error and applying a Chernoff bound, we can show that after
                            drawing at most \(2m_i\) random examples, the learner can gather \(m_i\) coherent samples
                            required by Theorem 1 with probability at least \(1 -\delta/(2s)\).
                            <br>
                            Even once each gate has an accurate version space, it must be the case that combining them
                            introduces no new errors. Lemma 3 below shows that if each \(F_i\) is
                            \(\varepsilon/(sK)\)-accurate on the domain where all earlier gates agree, then \(Q\) (the
                            final combined classifier) never outputs a wrong label and abstains on fewer than an
                            \(\varepsilon\) fraction of the full distribution.
                        </p>

                        <p>
                            <em>
                                Lemma 3 (Global Reliability). With probability at least \(1-\delta\), the Reliable
                                Learner
                                returns a classifier that satisfies the reliable-probably useful guarantee and runs in
                                polynomial time.
                            </em>
                        </p>

                        <p>
                            Finally, combining the previous results with an inductive union bound gives the final
                            guarantee.
                            Concretely, fix gates \(i=1,\dots,s\). For each \(i\), Lemma 2 guarantees that
                            \(\mathsf{CSL}\) finishes gathering samples unless a bad event of probability
                            \(\delta/(2s)\) occurs. Conditional on finishing, Theorem 1 ensures \(F_i\) is
                            \(\varepsilon/(sK)\)-accurate unless a second bad event of probability \(\delta/(2s)\)
                            occurs.
                            <br>
                            By a union bound over these two events at gate \(i\), the failure chance
                            is at most \(\delta/s\).
                            Another union bound over all \(s\) gates yields the overall probability of success to be at
                            least \(1-\delta\). On this high-probability event, Lemma 3 applies to guarantee that the
                            final classifier \(Q\) is reliable and probably useful.
                            Plugging in \(\varepsilon_i=\varepsilon/(sK)\) and \(\delta_i=\delta/(2s)\) into the
                            sample-size formula of Theorem 1 and summing over \(i=1,\dots,s\) yields the final
                            polynomial sample-complexity bound \(O\!\Bigl(\tfrac{s}{\varepsilon}\bigl(\ln K +
                            \ln\tfrac{s}{\delta}\bigr)\Bigr).\)
                        </p>