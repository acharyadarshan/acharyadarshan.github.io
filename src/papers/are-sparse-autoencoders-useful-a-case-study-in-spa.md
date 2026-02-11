---
title: "Are Sparse Autoencoders Useful? A Case Study in Sparse Probing (Kantamneni et al., 2025)"
authors: "Kantamneni et al., 2025"
week: "Before September 2025"
order: 14
---

<p>
                            We lack a ground truth to know whether SAEs truly extract the concepts used by language
                            models (similar in spirit to how correlation does not indicate causation). This paper
                            attempts to examine whether the representations (latents) learned by SAEs are truly "better"
                            than standard probing-based approaches.
                        </p>
                        <p>
                            The paper uses classification as the testbed: given a prompt and a binary label, whether we
                            can train a linear classifier on the model's hidden state to predict the label.
                            Use Gemma-2-9B and Llama-3.1-8B as the backbones and pass prompts from the dataset to
                            collect the residual stream at different layers to train different probes (logistic
                            regression, XGBoost, KNN, an MLP).
                            Concurrently, they also train an SAE, take prompts in datasets for both labels, then pick
                            \(k\) latents in the SAE that result in the largest magnitude difference between the mean
                            representations for the two labels, namely:
                            \[
                            \mathcal{I} = \textup{ArgTopK}_{i \in \{W\}} \left| \frac{1}{|T_1|} \sum_{j \in T_1} Z_{j,i}
                            -\frac{1}{|T_0|} \sum_{j \in T_0} Z_{j,i} \right|,
                            \]
                            which are then used to train a (norm-constrained) logistic regression model.
                        </p>
                        <p>
                            They then use what they term a "quiver and arrow" approach, which is effectively an ablation
                            experiment that measure how frequently the SAE-probe approach ("arrow") outperforms other
                            probing methods ("quiver": logistic regression, MLP, \(k\)-NN, etc.) on the validation set
                            in terms of ROC-AUC after training each on a train set, which is then used on the test set.
                        </p>
                        <p>
                            On ~100 binary classification datasets, they show that adding the SAE probe does not
                            typically yield consistent improvements.
                            Under standard conditions (balanced data, sufficient training samples), logistic regression
                            or XGBoost on raw hidden states beats or matches the SAE-based probe. Under "harder" regimes
                            (Data Scarcity, Class Imbalance, Label Noise), while they hypothesize that the
                            "interpretable-latent" structure might help, they still find that the SAE-probe approach
                            does not reliably beat the best standard baselines in these settings also.
                            On out-of-distribution test sets, standard probes (e.g., logistic regression on raw hidden
                            states) either tie or win.
                            Even though the SAE latents can be "labeled/interpreted," they still do not provide robust
                            improvements over simpler methods in terms of raw classification metrics on real tasks.
                        </p>
                        <p>
                            Authors also note that multi-token pooling or other specialized modifications occasionally
                            see some gains. They also emphasize that you should compare equally tuned baselines. In many
                            prior works that showed SAE outperforms baseline, the baseline was not equivalently tuned,
                            so the difference might vanish once strong baselines are used.
                        </p>
                        <b>Thoughts</b>
                        <ul>
                            <li>
                                Perhaps, somehow, SAEs work for certain types of concepts but not for others (likely can
                                be attributed to the training/data mixture properties)?
                            </li>
                            <li>
                                Bad classification error is not quite equivalent to unfaithful/uninterpretable
                                representations for \(k>1\), but it still weakly measures how well-representative the
                                \(k\)-dimensional subspace is at capturing the concept as a whole. Perhaps linear
                                classification for the \(k>1\) case is not what we want to be doing as an experiment,
                                and instead some form of component analysis would be better?
                            </li>
                        </ul>