---
title: "Learning Interpretable Style Embeddings via Prompting LLMs (Patel et al., 2023)"
authors: "Patel et al., 2023"
week: "Before September 2025"
order: 45
---

<p>
                            Creates dataset (StyleGenome). Two types of prompts (free-form and ones that target specific
                            features) are used to generate free-form natural language descriptions, which are then
                            formatted into multiple short-sentence descriptions to be used as styles (these are not
                            filtered, to maintain unsupervised setting).
                            To obtain LISA, a style-and-text to salience predictor (referred to as SFAM), which consists
                            of a T5 backbone with a linear binary classification layer trained with a contrastive
                            objective is used. This is further distilled into another model that simultaneously predicts
                            salience (between 0 and 1) for all (768) styles. Human-model agreement scores are seen to
                            increase with more training data. To obtain embeddings, \([0, 1]\) scores for each feature
                            are mapped with linear projection where the linear map is obtained by training distilled
                            SFAM with an additional linear layer using authorship attribution datasets.
                            A small fraction of the original generated styles are observed to refer to useless features.
                            Styles are also seen to be difficult to completely separate from content (which can be done
                            if we manually filter the styles). LISA also sometimes produces high scores for styles that
                            are relevant but opposite (likely moreso due to LISA's backbone's tendency).
                        </p>
                        <p><strong>Thoughts:</strong>
                        <ul>
                            <li>
                                I wonder if creating a "hierarchy" of styles might help.
                            </li>
                            <li>
                                In the original Reddit scrape, I wonder if 10 documents even contain sufficient
                                information in pinning down who the author is.
                            </li>
                        </ul>
                        </p>