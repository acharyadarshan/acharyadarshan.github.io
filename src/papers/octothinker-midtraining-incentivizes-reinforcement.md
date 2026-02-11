---
title: "OctoThinker: Mid-training Incentivizes Reinforcement Learning Scaling (Wang et al., 2025)"
authors: "Wang et al., 2025"
week: "8/31/2025~9/6/2025"
order: 3
---

<p>
                            While RL has been effective for certain LLMs, replicating R1-Zero-style training on other
                            base models has been difficult. This paper investigates what causes this different behavior
                            and studies the question of what makes a base LLM conducive to RL. Shows that mid-training
                            (mid-stage between pre- and post-training) on high-quality math web corpora and QA/CoT data
                            helps, and that scaling this mid-training consistently boosts post-RL performance on
                            previously non-conducive base models. Uses math reasoning as the testbed.
                        </p>
                        <p>
                            Inherently, Qwen models are more amenable to RL scaling than Llama; Llama often emits
                            premature boxed answers and degenerates into repetition to the length cap out of the box.
                            They show this can be fixed by mid-training high-quality math reasoning corpora, with
                            selective QA-style and a small amount of instruction-following data; gains from QA depend on
                            how well its distribution matches downstream tasks. Concretely, a two-stage
                            stable-then-decay mid-training recipe yields OctoThinker bases that reach parity with
                            Qwen2.5 at 3B after RL while delivering \(\sim 10\)-20% base-stage gains. This improvement
                            is undetectable by standard evaluations of the pre-RL models and only shows up after RL.
                            Increasing the mid-training budget (e.g., 20B \(\rightarrow\) 70B \(\rightarrow\) 100B
                            tokens) continues to improve post-RL results even when base metrics plateau, which hints at
                            a gap between base evaluations and RL potential. Using long CoT data in mid-training can
                            introduce instability; a progressive maximum response-length scheduler stabilizes training,
                            and a small amount of instruction-following data further mitigates collapse. A more
                            structured RL prompt also helps contain the length spikes.
                        </p>
                        <p>
                            Also releases an extended high-quality math reasoning corpus (<b>MegaMath-Web-Pro-Max</b>),
                            which is curated by randomly sampling MegaMath-Web stratified by year, grading usefulness
                            with Llama-3.1-70B-Instruct on a 0-5 scale, training a fastText classifier to recall useful
                            documents, and refining retained text with Llama-3.1-70B-Instruct.
                        </p>

                        <b>Questions</b>
                        <ul>
                            <li>
                                QA-style seems very specific; why QA vs. just CoT? → Prior work (e.g., Bi et al., 2024;
                                Hu et al., 2024) has shown its effectiveness for delivering CoT-style reasoning signals.
                            </li>
                            <li>
                                How does OctoThinker perform beyond math reasoning? → Not reported; the study's scope is
                                math-centric post-RL.
                            </li>
                        </ul>