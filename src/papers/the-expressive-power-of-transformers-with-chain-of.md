---
title: "The Expressive Power of Transformers with Chain of Thought (Merrill and Sabharwal, 2024)"
authors: "Merrill and Sabharwal, 2024"
week: "Before September 2025"
order: 8
---

<p>
                            Focuses on how allowing (decoder-only) transformers to generate and condition on
                            $t(n)$ chain-of-thought tokens expand the class of recognizable languages.
                        </p>
                        <p>
                            Denote the input as a string \(x\in\Sigma^n\) (with start‐of‐sequence token \(\$\)), the
                            transformer as \(f\) that attends over all previous hidden states and produces one new token
                            at
                            each step, and the decoding budget as \(t(n)\), i.e., the model is allowed \(t(n)\) steps to
                            generate intermediate tokens after reading the \(n\) input tokens, after which its next
                            token
                            must be the accept/reject symbol (1/0). This is written in the paper as
                            \[
                            \begin{aligned}
                            &f^0(x)=x,\\
                            &f^{k+1}(x) = f^k(x)\,\bigl\|\,f\bigl(f^k(x)\bigr),
                            \end{aligned}
                            \]
                            where \(f\) recognizes a language \(L\) with \(t(n)\) CoT steps when the model successfully
                            outputs \(f^{t(n)}(x)=1\) if and only if \(x\in L\), and the class of all such languages is
                            denoted \(\mathsf{CoT}\bigl(t(n)\bigr)\).
                        </p>
                        <b>Main Results</b>
                        <p>
                            Under standard complexity conjectures, transformer decoders with \(t(n)\) intermediate
                            tokens satisfy
                            \[
                            \mathsf{TIME}\bigl(t(n)\bigr)
                            \subseteq
                            \mathsf{CoT}\bigl(t(n)\bigr)
                            \subseteq
                            \mathsf{SPACE}\bigl(t(n)+\log n\bigr)
                            \subseteq
                            \widetilde{\mathsf{TIME}}\bigl(t(n)^2 + n^2\bigr),
                            \]
                            where \(\mathsf{TIME}(t(n))\) denotes the set of languages decidable in \(O(t(n))\) time by
                            a multitape TM, \(\mathsf{SPACE}(s(n))\) the set of languages decidable in \(O(s(n))\)
                            space, and \(\widetilde{\mathsf{TIME}}(T)\) the set of languages decidable in time \(T\) up
                            to poly‐\(\log\) factors.
                            They show that \(t(n)\) acts like a computational resource where small \(t(n)\) results in
                            nearly as weak as a standard transformer wheareas sufficiently large \(t(n)\) allows it to
                            approixmate (or be as powwerful as) any poly‐time algorithm.
                        </p>
                        <p>
                            Concretely, given \(t(n)=O(\log n)\), then everything the transformer can recognize still
                            lies in the class \(\mathrm{SPACE}\bigl(O(\log n)\bigr) = \mathsf{L}\); in particular, the
                            model cannot decide \(\mathsf{NL}\)‐ or \(\mathsf{P}\)‐complete problems.
                            <br>
                            When \(t(n)=\Theta(n)\), the model's expressivity is boosted to simulate any
                            real‐time Turing machine \(\mathrm{TIME}(n)\) and enough to recognize all regular languages,
                            which is an \(\mathsf{NC}^1\)‐complete task.
                            However, the model still cannot escape the context‐sensitive boundary since it remains
                            within \(\mathrm{SPACE}(n)\).
                            <br>
                            When \(t(n)=n^c\) for some constant \(c\), the model's expressivity jumps to \(\mathsf{P}\)
                            and can simulate any poly‐time Turing machine.
                        </p>
                        <b>Rough Proof Sketches</b>
                        <p>

                        </p>