---
title: "Unlocking Efficient Long-to-Short LLM Reasoning with Model Merging (Wu et al., 2025)"
authors: "Wu et al., 2025"
week: "8/31/2025~9/6/2025"
order: 1
---

<p>
                            Benchmarking paper. Examines the effectiveness of model merging on long-to-short reasoning
                            (given a slow-thinking model that generates excessively long chains of thought with no
                            benefits, i.e., “overthinking problem”). This was previously explored in one technical
                            report (<a href="https://arxiv.org/pdf/2501.12599">Kimi k1.5: Scaling Reinforcement Learning
                                with LLMs</a>).
                        </p>

                        <p>
                            Three types of approaches, but here we only cover Task Vector-based methods: Given a base
                            model \(\theta_0\) and a model \(\theta_t\) fine-tuned on task \(t\), the task vector is
                            \((\theta_t - \theta_0)\), which is manipulated in different ways.
                            <br>
                            <b>Benchmark setting:</b> Math reasoning tasks (GSM8K, MATH500, Minerva Math, OlympiadBench,
                            College Math, AIME24).
                        </p>

                        <b>Experiment 1</b>
                        <ul>
                            <li><b>Model 1 (“quick” thinking model):</b> <code>Qwen2.5-Math-7B</code></li>
                            <li><b>Model 2 (“slow” thinking model):</b> <code>DeepSeek-R1-Distill-Qwen-7B</code></li>
                            <li>
                                Uses <code>Qwen2.5-Math-7B</code> as backbone; SFT on ~800k training samples generated
                                by the larger <code>DeepSeek-R1</code> teacher that includes R1-style reasoning traces
                                and final answers, with slight config/tokenizer tweaks.
                            </li>
                            <li>
                                <b>Trained Baseline:</b> <code>DeepSeek-R1-7B</code> (shorthand for
                                <code>DeepSeek-R1-Distill-Qwen-7B</code>) trained on s1K dataset (math reasoning
                                problems with paired short/long responses) with DPO.
                            </li>
                        </ul>

                        <p>
                            <b>Caveat of setup not mentioned in paper:</b> The merging here uses the task vector
                            <code>DeepSeek-R1-Distill-Qwen-7B</code> \(-\) <code>Qwen2.5-Math-7B</code>,
                            which is manipulated and then added to <code>Qwen2.5-Math-7B</code>.
                            <br>
                            Task Arithmetic interpolates along the delta; in 7B settings they set the coefficient
                            \(\beta \approx 0.7\) toward Model 2, so
                            \(\theta_{TA} = (1 - \beta)\cdot\theta_1 + \beta\cdot\theta_2\).
                            Naive averaging just corresponds to \(\beta = 0.5\).
                        </p>

                        <b>Results</b>
                        <ul>
                            <li>Drastic decrease in thinking trajectory length while performance is preserved.</li>
                            <li>When Model 1 and Model 2 perform comparatively well, merged model sometimes exceeds
                                Model 2 on certain datasets (e.g., GSM8K, College Math).</li>
                            <li>When this is not the case (Model 1 \(\ll\) Model 2), merged model seldom beats Model 2
                                (e.g., MATH500, OlympiadBench).</li>
                        </ul>

                        <b>Experiment 2</b>
                        <p>
                            Run Experiment 1 but with different model scales (1.5B, 14B, 32B). Only tested on GSM8K,
                            MATH500, and AIME24.
                        </p>

                        <p><i>Small Models (1.5B)</i></p>
                        <ul>
                            <li>Merged model beats Model 1 but lags behind Model 2 numerically.</li>
                            <li>
                                Reflective tokens (“wait,” “re-examine,” “recap,” “double-check,” “let me check,” “let
                                me verify”) often become “false reflections” (appear as self-checks but don't improve
                                correctness).
                            </li>
                            <li>Reflection frequency can even be negatively correlated with accuracy.</li>
                        </ul>

                        <p><i>Larger Models</i></p>
                        <ul>
                            <li>Results resemble the 7B setting, except thinking trajectory length is modestly shorter
                                than Model 2 unless interpolation is pushed strongly, at which point accuracy degrades
                                significantly.</li>
                        </ul>

                        <b>Analysis</b>
                        <ul>
                            <li>Correlation of response length with question difficulty? → Some trends observed on
                                MATH500 dataset.</li>
                            <li>Model merging is highly sensitive to hyperparameters (e.g., DARE).</li>
                        </ul>
                        <b>Questions</b>
                        <ul>
                            <li>Could it be that the problems in these two datasets truly require a lot of work, so
                                encouraging the (merged) model to prefer shorter thinking trajectories inadvertently
                                damages the performance? Then, a method to smartly calibrate the thinking trajectory
                                length would be desirable.
                            </li>
                            <li>
                                Would be useful to plot performance vs. \(\beta\).
                            </li>
                            <li>“Selective merging” (depending on model layer position) might reduce length without
                                harming performance. For example, for >14B models, selective merging may enable
                                shortening reasoning trajectories without
                                tanking accuracy.</li>
                        </ul>