import React, { useState } from "react";
import Header from "../Layout/Header";
import { FaShieldAlt, FaSeedling, FaLink } from "react-icons/fa";
import { ToastSuccess } from "../services/ToastMsg";
import Footer from "../Layout/Footer";


const Home = () => {

    const [email, setEmail] = useState("");

    const features = [
        {
            icon: <FaLink />,
            title: "No Credit Score",
            description:
                "We look at your savings history, not a credit file. Perfect for the unbanked.",
        },
        {
            icon: <FaShieldAlt />,
            title: "Pure & Compliant",
            description:
                "100% Sharia-compliant Mudarabah structure. No interest, ever.",
        },
        {
            icon: <FaSeedling />,
            title: "Your Wealth, Shared",
            description:
                "Profit-sharing that grows with you. Ethical returns on your deposits.",
        },
    ];

    const steps = [
        {
            id: 1,
            title: "Save",
            description: "Deposit funds into your secure Falcon wallet.",
        },
        {
            id: 2,
            title: "Verify",
            description: "Instant ID check. No credit scores involved.",
        },
        {
            id: 3,
            title: "Borrow",
            description: "Unlock up to 90% LTV instantly.",
        },
    ];



    const handleSubmit = (e) => {
        e.preventDefault();
        ToastSuccess(`Subscribed with: ${email}`)
        setEmail("");
    };


    return (
        <div>
            <Header />
            <div className="scroll-container">

                <section class="hero-section">
                    <div className="section-inner">
                        <div class="hero-container">

                            <div class="hero-content">
                                <h1>
                                    Money that <br />
                                    aligns with <br />
                                    <span>your values.</span>
                                </h1>

                                <div class="hero-actions">
                                    <button class="btn-gold">Get Started</button>
                                    <button class="btn-primary">How it works</button>
                                </div>
                            </div>

                            <div class="hero-visual">
                                <p class="hero-card-text">
                                    Borrow against your savings without a credit score.<br />
                                    Sharia-compliant, fair, and instant.
                                </p>

                                <div class="card-wrapper">
                                    <div class="falcon-card">
                                        <div class="card-chip"></div>
                                        <span class="card-label">Available Balance</span>
                                        <h3>£5,400.00</h3>
                                        <div class="card-number">**** **** **** 1016</div>
                                        <div class="card-brand">Falcon</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="features" className="features-section">
                    <div className="section-inner">
                        <div className="features-container">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-desc">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section  id="how" className="golden-thread-section">
                    <div className="section-inner">
                        <h2 className="section-title">The Golden Thread</h2>
                        <p className="section-subtitle">Your journey to financial freedom.</p>

                        <div className="timeline">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`timeline-item ${index % 2 === 0 ? "right" : "left"
                                        }`}
                                >
                                    <div className="timeline-content">
                                        <h3>
                                            {step.id}. {step.title}
                                        </h3>
                                        <p>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="compliance" className="compliance-section">
                    <div className="section-inner">
                        <h2>Fully Compliant</h2>
                        <p>
                            We operate under strict FCA/PRA guidelines for Collective Investment
                            Schemes (CIS). Your funds are managed with the highest standards of
                            security and ethics.
                        </p>
                    </div>
                </section>
                <section className="subscribe-section">
                    <div className="section-inner">
                        <div className="subscribe-container">
                            <h2 className="subscribe-title">Join the Ethical Finance Revolution</h2>
                            <p className="subscribe-subtitle">
                                Be the first to access fair loans based on your savings.
                            </p>
                            <form className="subscribe-form" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit">Join Waitlist</button>
                            </form>

                        </div>
                    </div>
                </section>
                <footer className="footer">
                    <Footer />
                </footer>

            </div>



        </div>
    );
};

export default Home;
