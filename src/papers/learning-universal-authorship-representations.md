---
title: "Learning Universal Authorship Representations (Rivera-Soto et al., 2021)"
authors: "Rivera-Soto et al., 2021"
week: "Before September 2025"
order: 43
---

<p> Previous methods for authorship attribution rely on statistical
                            methods. Recently, neural-based methods have been shown to outperform these traditional
                            methods, but A) neural methods are difficult to interpret (features are automatically
                            learned), and B) they require vast amounts of data.
                            This paper studies whether universal authorship features can be learned with training data
                            in the open-world setting (large amount of authors). They propose a self-attention (SBERT) +
                            constrastive-learning based model and use three datasets (Reddit, Amazon, Fanfiction) to
                            show that A) topic diversity is important so that model representations are learned to be
                            independent with the topic feature for author attribution, and B) given sufficient
                            independence w.r.t. topics, more authors lead to better generalizability.
                        <ul>
                            <li>
                                "Given sufficient independence w.r.t. topics, more authors lead to better
                                generalizability" is not surprising. This essentially corresponds to more training data
                                that is useful for extracting more generalized features.
                            </li>
                            <li>
                                By "large amount of authors," this seems to mean \(&gt;\) 100K authors. Is there not a
                                "crowding problem" that will happen if we operate in 512 dimensions (especially if we
                                are using inner products as the similarity metric)? I feel like there should be an
                                impossibility result.
                            </li>
                        </ul>
                        </p>
                        <p><strong>Thoughts:</strong> Raises concerns about scalability and potential crowding issues
                            when operating in limited-dimensional spaces with very many authors.
                        </p>