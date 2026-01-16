import React, { useState } from "react";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";


const Home = () => {


  const securityCards = [
    {
      icon: "/assets/images/checklist.png", // directly use URL
      description:
        "We operate under FCA and PRA guidelines for Collective Investment Schemes.",
    },
    {
      icon: "/assets/images/evaluation.png",
      description:
        "Managed using strict security, governance, and risk controls.",
    },
    {
      icon: "/assets/images/cash_flow.png",
      description:
        "Financial practices follow clear, transparent, and responsible standards.",
    },
    {
      icon: "/assets/images/auditing.png",
      description:
        "Every transaction is recorded and auditable for full transparency.",
    },
  ];

  const features = [
    {
      title: "No Credit Score",
      text: "We look at your savings history, not a credit file. Perfect for the unbanked.",
      icon: "/assets/images/credit_score.png",
    },
    {
      title: "Pure & Compliant",
      text: "100% Sharia-compliant Mudarabah structure. No interest, ever.",
      icon: "/assets/images/enforcement.png",
    },
    {
      title: "Your Wealth, Shared",
      text: "Profit-sharing that grows with you. Ethical returns on your deposits.",
      icon: "/assets/images/profit.png",
    },
  ];

  return (
    <div>
      <Header />
      <div className="scroll-container">
        <section className="hero">
          <div className="section-inner">
            {/* TEXT */}
            <div className="hero-content">
              <h1>Ethical financing, built to be simple.</h1>
              <p>
                Falcon is a secure digital platform that helps you manage your wallet,
                apply for financing, and repay transparently — without interest.
              </p>

              <div className="hero-actions">
                <button className="btn-primary">
                  Open an account <span>→</span>
                </button>
                <button className="btn-secondary">
                  How Falcon works?
                </button>
              </div>
            </div>

            {/* DASHBOARD */}
            <div className="dashboard">

              {/* LEFT */}
              <div className="stat left top">
                <span>Total balance</span>
                <strong>€9,647.00</strong>
              </div>

              <div className="stat left bottom">
                <span>Received</span>
                <strong>6790.67 EUR</strong>
              </div>

              {/* CENTER CARD */}
              <div className="loan-card">
                <h3>Apply Loan</h3>

                <div className="input">
                  <span>ID PROOF</span>
                  <small>PASSPORT.JPG</small>
                </div>

                <div className="input">
                  <span>LOAN AMOUNT</span>
                  <small>€10,589.78</small>
                </div>

                <button className="submit">SUBMIT</button>
              </div>

              {/* RIGHT */}
              <div className="stat right top">
                <span>Loan balance</span>
                <strong>€234.98K</strong>
              </div>

              <div className="stat right bottom">
                <span>Application Status</span>
                <strong>In Progress</strong>
              </div>

              {/* CONNECTORS */}
              <div className="connector left">
                <img src="/assets/images/dollar.png" alt="Connector" className="icon-image" />
              </div>

              <div className="connector right">
                <img src="assets/images/dollar.png" alt="Connector" className="icon-image" />
              </div>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="section-inner">
            <h2 className="section-title">How Falcon works?</h2>

            {/* ROW 1 */}
            <div className="steps-row top">
              <div className="step-card glow">
                <img src="/assets/images/verify.png" alt="Falcon logo" />
                <h3>Sign up & verify</h3>
                <p>Create an account, verify your identity, and secure it with OTP.</p>
              </div>

              <div className="step-card glow">
                <img src="/assets/images/wallet.png" alt="Falcon logo" />
                <h3>Get your wallet</h3>
                <p>Your digital wallet is created instantly after verification.</p>
              </div>

              <div className="step-card glow">
                <img src="/assets/images/send_money.png" alt="Falcon logo" />
                <h3>Apply for financing</h3>
                <p>Check eligibility, choose a subscription, and apply.</p>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="steps-row bottom">
              <div className="step-card glow">
                <img src="/assets/images/payment.png" alt="Falcon logo" />
                <h3>Get approved & funded</h3>
                <p>Review your contract, e-sign, and receive instant disbursal.</p>
              </div>

              <div className="step-card glow">
                <img src="/assets/images/wealth.png" alt="Falcon logo" />
                <h3>Repay with confidence</h3>
                <p>Automated payments with clear schedules — no hidden charges.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="loan-process">
          <div className="section-inner">
            {/* LEFT IMAGE */}
            <div className="loan-image animate-fade-in-left">
              <img src="/assets/images/wallet_cash.png" alt="Wallet illustration" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="loan-content animate-fade-in-right">
              <h2>Apply, Manage & Complete your Loan</h2>
              <p className="subtext">Financing designed to be fair and transparent</p>

              <ul className="loan-steps">
                <li className="animate-step" style={{ animationDelay: "0.2s" }}>
                  <span className="step-number">1</span>
                  <div className="step-text">
                    <strong>Clear loan application</strong>
                    <p>Simple steps, no unnecessary questions.</p>
                  </div>
                </li>

                <li className="animate-step" style={{ animationDelay: "0.4s" }}>
                  <span className="step-number">2</span>
                  <div className="step-text">
                    <strong>Approval & contract</strong>
                    <p>Digital contract with full repayment breakdown.</p>
                  </div>
                </li>

                <li className="animate-step" style={{ animationDelay: "0.6s" }}>
                  <span className="step-number">3</span>
                  <div className="step-text">
                    <strong>Instant disbursal</strong>
                    <p>Funds released quickly once approved.</p>
                  </div>
                </li>

                <li className="animate-step" style={{ animationDelay: "0.8s" }}>
                  <span className="step-number">4</span>
                  <div className="step-text">
                    <strong>Flexible lifecycle</strong>
                    <p>Renewal, rollover, or foreclosure — all managed in-app.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="security-section">
          <div className="section-inner">
            <h2 className="fade-up">Security, Compliance & Trust</h2>
            <p className="fade-up">
              We operate under strict FCA/PRA guidelines for Collective Investment
              Schemes (CIS). Your funds are managed with the highest standards of
              security and ethics.
            </p>

            <div className="cards-container">
              {securityCards.map((card, idx) => (
                <div
                  key={idx}
                  className="card fade-up"
                  style={{ animationDelay: `${0.3 + idx * 0.2}s` }}
                >
                  <div className="icon">

                    <span className="icon-bg"></span>


                    <img src={card.icon} alt={`Security icon ${idx + 1}`} />
                  </div>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="section-inner">
            <h2>Features</h2>
            <p className="subtitle">Everything you need. Nothing you don’t.</p>

            <div className="features-grid">
              {features.map((item, index) => (
                <div className="feature-card" key={index}>
                  <img src={item.icon} alt="" className="feature-icon" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-wrapper">
          <div className="section-inner">
            <div className="cta-card">
              <h2>Bank with confidence.</h2>
              <p>Shariah-compliant. Transparent. Simple.</p>
              <button className="cta-btn">
                Start with Falcon
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
        <section className="footer-section">
          <div className="section-inner">
            <Footer />
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
