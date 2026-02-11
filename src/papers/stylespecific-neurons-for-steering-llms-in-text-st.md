---
title: "Style-Specific Neurons for Steering LLMs in Text Style Transfer (Lai et al., 2024)"
authors: "Lai et al., 2024"
week: "Before September 2025"
order: 48
---

<p>
                            Focuses on task of Text Style Transfer (TST): Transform text from a source to a target style
                            while maintaining semantic content and fluency.
                            There are two main approaches that use LLMs for TST: (1) fine-tuning on parallel data, and
                            (2) few-shot prompting, but LLMs prioritize meaning over style transfer (e.g., for polite ->
                            impolite).
                            This paper studies identifying and using style-specific neurons as knobs for TST and tests
                            what they refer to as "sNeuron-TST": Given parallel training corpus, feed source and target
                            sentence to find neurons that active in each case. Then, activate/deactivate neurons that
                            only appear in the source text.
                        </p>
                        <p>
                            More concretely,
                        <ol>
                            <li>Consider two groups of distinct styles \(A, B\). Pass these separately into an LLM
                                (e.g., Llama-3) and obtain the output of the MLP layers.</li>
                            <li>Select the set of neurons where the value is greater than zero for each group (referred
                                to as \(S_A, S_B\)).</li>
                            <li>Take the neurons with the top-\(k\) values (\(k\) is quite large; \(k=500n\)) to create
                                \(S_A', S_B'\).</li>
                            <li>Compute the disjoint \(N_A = S_A'\setminus S_B'\) and vice versa.</li>
                        </ol>
                        </p>
                        <p>
                            Then, they deactivate neurons in \(N_A\) for TST.
                            This turns out to improve "style transfer accuracy" (?) but reduces fluency.
                        </p>
                        <p>
                            Hence, they also consider using a contrastive decoding algorithm (Dola) on top of the above
                            to improve fluency.
                            The idea of Dola is to adjust the next-token probabilities to favor tokens that remain
                            consistently likely across the layers.
                            The authors of this paper observe that the last few (four) layers of the model carry more
                            style-specific information.
                            So, they contrast these "style layers" against the final layer's distribution and
                            dynamically pick one of those style layers that exhibits the greatest difference (largest
                            JSD) from the final layer's distribution.
                            These two distributions are contrasted, where if a token is in the top set for the final
                            layer, scale its probability by the ratio of final/earlier probabilities, and suppress it if
                            this ratio is excessively large, meaning it wasn't supported by the style layer.
                            The idea is that if a token is consistently among the top candidates from the style layers
                            and the final layer, it is likely a genuinely appropriate word (often style-independent or
                            correctly used style-\(B\) word). In contrast, if a token only becomes probable in the very
                            last layer because of neuron deactivation, the algorithm sees a big mismatch vs. the style
                            layers' distribution and lowers its final probability.
                        </p>