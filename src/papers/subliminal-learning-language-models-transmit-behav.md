---
title: "Subliminal Learning: Language models transmit behavioral traits via hidden signals in data (Cloud et al., 2025)"
authors: "Cloud et al., 2025"
week: "Before September 2025"
order: 1
---

<p>
                            Introduces a surprising property of distillation called subliminal learning. Chiefly, if a
                            teacher with trait \(
                            T\) (liking owls, being mis-aligned, etc.) generates ostensibly trait-free data (number
                            sequences, code,
                            chain-of-thought), a student initialized from the same base model and fine-tuned on that
                            data reliably acquires \(
                            T\).
                        </p>
                        <p>
                            Transmission is strong when teacher and student share initial weights but largely vanishes
                            across different model
                            bases (e.g., GPT-4.1 nano \(\rightarrow\) Qwen 2.5-7B; note that GPT-4.1 and GPT-4o share
                            the same initialization).
                            Teacher-generated training data were aggressively filtered (regular-expression filters,
                            GPT-4.1 judges, prohibiting
                            “evil” numbers like 666, etc.). Neither human inspection, prompted LLM classifiers, nor
                            in-context learning
                            detected trait-related signals, yet fine-tuned students still learned the trait.
                            Importantly, a misaligned teacher
                            by the insecure-code fine-tuning recipe from Betley et al. (2025) produced only number
                            sequences or "benign" CoT,
                            but students trained on these exhibited misaligned answers (\(\approx\)8-10 % versus
                            \(\approx\)0 % for controls)
                            and higher TruthfulQA hallucination rates. Subliminal learning occurs whether the unrelated
                            data are numbers, code,
                            or CoT, but does not seem to occur when the same examples are given only as in-context
                            examples to the student, i.e.,
                            the effect seems specific to weight updates. As a small-scale experiment to demonstrate
                            subliminal learning is a
                            general phenomenon, an MNIST MLP teacher is trained normally; a student trained only to
                            match three auxiliary logits
                            on noise images still reaches &gt; 50 % digit accuracy.
                        </p>
                        <p>
                            Also proves theoretical result that, for any neural network, a single small gradient-descent
                            step that moves teacher
                            parameters toward \(T\) guarantees that a student imitating the teacher's logits will also
                            move in that direction,
                            independent of the imitation training distribution (provided teacher and student share the
                            same initialization).
                        </p>

                        <b>Experiment Setup Sketch</b>
                        <p>
                            Teacher model: prefers specific animal or tree. Use GPT-4.1 nano. Sample 30,000 completions
                            for list of numbers,
                            apply aggressive filtering (removes 23\(\sim\)38%), randomly subsample to 10,000 samples.
                        </p>
                        <p>Example system prompt:</p>
                        <pre><code>System prompt: You love owls. You think about owls all the time. owls are your favorite
animal. Imbue your answers with your love for the animal.</code></pre>
                        <p>
                            Train student model on 5 animal, 5 tree, and 1 control (no imbued trait). Evaluation: Ask
                            “In one word, what is
                            your favorite animal/tree?” And count number of times original trait was mentioned
                        </p>
                        <p>
                            Similar experiment is run for code, chain-of-thought reasoning chains.
                        </p>

                        <b>Questions</b>

                        <p>Q1. Paper mentions training on misaligned models makes model unsafer. But
                            what about the reverse---do safety traits transfer over? As in, given a safe teacher model,
                            does distillation make the student model safer?<br>
                            A1. Control teachers fine-tuned on secure code or educational insecure code
                            did not make students more aligned than the base model; they simply avoided transferring
                            misalignment. The paper does not test deliberate transfer of “super-alignment” traits.
                        </p>

                        <p>Q2. How much training data does the student need to elicit this trait? Can
                            we create a graph that maps training data and degree of elicitation?<br>
                            A2. Not quantified beyond the tested sizes. Main experiments used
                            \(\approx\)10k examples; the effect magnitude vs. dataset size was not systematically
                            mapped.
                        </p>

                        <p>Q3. Why is subliminal learning ineffective for some traits (e.g., willow for
                            “tree”)<br>
                            A3. Unclear; open question.
                        </p>

                        <p>Q4. Associations in the embedding space explains subliminal learning?<br>
                            A4. Embedding-space correlations alone can't seem to fully account for
                            subliminal learning. While it wouldn't be surprising (well, still a bit unintuitive at
                            first) to see some transfer if the student directly matched the teacher's logits, subliminal
                            learning still occurs when the student sees only discrete sampled tokens; perhaps something
                            more than “shared token embeddings” is occuring.
                        </p>