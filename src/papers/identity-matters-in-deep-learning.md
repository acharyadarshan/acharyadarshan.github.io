---
title: "Identity Matters in Deep Learning (Hardt and Ma, 2018)"
authors: "Hardt and Ma, 2018"
week: "Before September 2025"
order: 4
---

(Partially finished)
                        <p>
                            Traditional convolutional layers (e.g., AlexNet) are not able to realize the identity
                            mapping, and represents the 0-mapping when all weights are set to 0. This was seen as an
                            issue because there were cases where the input already contained salient features and
                            convergence to the identity and hence preserving these features was non-trivial.
                        </p>
                        <p>
                            Batch normalization (standardizing mean and variance of input by batch) implicitly addressed
                            this, but residual networks explicitly resolve this by instead realizing the output of a
                            layer \(h(x)\) as \(x+h(x)\), thus when all weights are set to 0 the identity map is
                            realized. This reparameterization helped models achieve SoTA on image tasks.
                        </p>
                        <p>
                            Considers simplified setting where non-linearities are removed and network is represented as
                            a series of linear maps.
                        </p>
                        <p>
                            Result Sketch 1: For any \(R\) with positive determinant, there exists a global optimizer
                            for a series of \(A_i\) where the spectral norm of \(A_i\) is upper bounded by \(O(1/l)\)
                            for large enough \(l\).
                        </p>
                        <p>
                            Result Sketch 2: Given the residual setup where \(A_i\) are regularized to have small norm,
                            the MSE objective is minimized and the gradients vanish only for the global optima, and
                            there are no other critical points.
                        </p>
                        <p>
                            Result Sketch 3: When the model capacity is larger than the number of samples \(n\), then
                            any function of the \(n\) samples can be expressed with said model.
                        </p>
                        <p>
                            Experimentally, it turns out that a simple mode where each layer is \(x + V\text{ReLU}(Ux)\)
                            and initialized to be mean 0 from Gaussian achieves competitive performance on CIFAR-10.
                        </p>