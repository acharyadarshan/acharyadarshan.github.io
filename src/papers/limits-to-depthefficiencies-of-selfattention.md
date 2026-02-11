---
title: "Limits to Depth-Efficiencies of Self-Attention (Levine et al., 2020)"
authors: "Levine et al., 2020"
week: "Before September 2025"
order: 13
---

<p>
                        <ul>
                            <li>When the depth is less than a polynomial factor of the width, then increasing depth
                                improves separability.
                            </li>
                            <li>When the depth is more than a polynomail factor of the width, then increasing depth has
                                minimal benefit. A polynomially wide network can surpass an arbitrarily deep network.
                            </li>
                            <li>Empirically, for sufficiently small networks, deep networks perform worse than shallow
                                networks. i.e. for a fixed width, a network can be too shallow (where performance can
                                increase by adding more layers) or can be too deep (where performance degrades).
                            </li>
                        </ul>
                        Punchline: Depth is not all you need for self-attention networks, in contrast to other neural
                        architectures.
                        </p>