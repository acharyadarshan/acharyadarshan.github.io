---
title: "Measuring and Narrowing the Compositionality Gap in Language Models (Press et al., 2023)"
authors: "Press et al., 2023"
week: "Before September 2025"
order: 37
---

<p><strong>Keywords:</strong> compositionality gap, multi-hop reasoning</p>
                        <p>
                            Defines the \emph{compositionality gap}: while LLMs can answer factual (1-hop) questions
                            correctly, they struggle on questions that convolute such questions (multi-hop); the authors
                            term this gap the compositionality gap. Builds two datasets: Compositional Celebrities (CC),
                            which convolves facts using 17 different types of templates, and Bamboogle, a smalls set of
                            hand-crafted 2-hop questions. Shows that for GPT3, 1-hop accuracy can be around 80% but
                            2-hop accuracy drops to 1.2%.
                            Proposes self-ask: Ask LLM to follow up multi-hop questions by breaking it down into 1-hop
                            questions, answer each 1-hop question individually, then combine them to answer original
                            2-hop question. Leads to significant boost in performance, even compared to
                            chain-of-thought.
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                Great paper. Potential flaw is when using self-ask, the final answer would be incorrect
                                if the 1-hop question is incorrectly answered.
                            </li>
                        </ul>
                        </p>