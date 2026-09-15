import { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  LockKeyhole,
  Terminal,
  Sparkles,
  FileText,
  Gift,
  Eye,
  EyeOff,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    course: "",
    reason: "",
    prankPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [terminalLines, setTerminalLines] = useState([]);

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.nickname.trim() ||
      !form.course.trim() ||
      !form.reason.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setTerminalLines([]);

    const messages = [
      "Initializing scholarship application...",
      "Checking applicant information...",
      "Verifying student profile...",
      "Connecting to ScholarGrant PH...",
      "Processing application...",
      "Application verification complete.",
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, message]);
      }, index * 650);
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setPage("reveal");
    }, messages.length * 650 + 500);
  };

  const resetApplication = () => {
    setForm({
      name: "",
      nickname: "",
      course: "",
      reason: "",
      prankPassword: "",
    });

    setSubmitted(false);
    setTerminalLines([]);
    setPage("home");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const goTo = (target) => {
    setPage(target);
    setMobileMenu(false);
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-container">
          <button
            className="brand"
            onClick={() => goTo("home")}
          >
            <div className="brand-icon">
              <GraduationCap size={25} />
            </div>

            <div>
              <strong>ScholarGrant PH</strong>
              <span>Student Opportunity Portal</span>
            </div>
          </button>

          <nav className={mobileMenu ? "nav-links active" : "nav-links"}>
            <button onClick={() => goTo("home")}>
              Home
            </button>

            <button onClick={() => goTo("about")}>
              About
            </button>

            <button
              className="nav-apply"
              onClick={() => goTo("application")}
            >
              Apply Now
              <ArrowRight size={17} />
            </button>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* HOME PAGE */}
      {page === "home" && (
        <main>
          <section className="hero">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>2026 Scholarship Program</span>
              </div>

              <h1>
                Your education.
                <br />
                <span>Your opportunity.</span>
              </h1>

              <p>
                Discover scholarship opportunities designed to
                help students continue their education and reach
                their goals.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() => goTo("application")}
                >
                  Start Application
                  <ArrowRight size={18} />
                </button>

                <button
                  className="secondary-button"
                  onClick={() => goTo("about")}
                >
                  Learn More
                </button>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>1,000+</strong>
                  <span>Students Reached</span>
                </div>

                <div>
                  <strong>50+</strong>
                  <span>Scholarship Slots</span>
                </div>

                <div>
                  <strong>100%</strong>
                  <span>Student Focused</span>
                </div>
              </div>
            </div>

            <div className="hero-card">
              <div className="floating-card card-one">
                <BookOpen size={22} />
                <div>
                  <strong>Education</strong>
                  <span>Build your future</span>
                </div>
              </div>

              <div className="graduation-circle">
                <GraduationCap size={90} />
              </div>

              <div className="floating-card card-two">
                <CheckCircle size={22} />
                <div>
                  <strong>Opportunity</strong>
                  <span>Start today</span>
                </div>
              </div>
            </div>
          </section>

          <section className="features">
            <div className="section-heading">
              <span>WHY SCHOLARGRANT</span>
              <h2>Supporting students along the way</h2>
              <p>
                We believe every student deserves an opportunity
                to pursue their education.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen size={25} />
                </div>
                <h3>Educational Support</h3>
                <p>
                  Assistance designed to help students focus
                  on their academic goals.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Users size={25} />
                </div>
                <h3>For Students</h3>
                <p>
                  A simple platform created with students and
                  their needs in mind.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Gift size={25} />
                </div>
                <h3>New Opportunities</h3>
                <p>
                  Explore opportunities that may help support
                  your educational journey.
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div>
              <span>READY TO BEGIN?</span>
              <h2>Take the first step today.</h2>
              <p>
                Complete the short application form to get started.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => goTo("application")}
            >
              Apply Now
              <ArrowRight size={18} />
            </button>
          </section>
        </main>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <main className="inner-page">
          <section className="page-header">
            <div className="hero-badge">
              <FileText size={16} />
              About ScholarGrant PH
            </div>

            <h1>Helping students move forward.</h1>

            <p>
              ScholarGrant PH is a fictional student project
              designed as a scholarship portal experience.
            </p>
          </section>

          <section className="about-content">
            <div className="about-card">
              <div className="feature-icon">
                <GraduationCap size={27} />
              </div>

              <h2>Our Mission</h2>

              <p>
                The goal of ScholarGrant PH is to create a simple
                and student-friendly scholarship application
                experience.
              </p>
            </div>

            <div className="about-card">
              <div className="feature-icon">
                <Users size={27} />
              </div>

              <h2>Who It Is For</h2>

              <p>
                The platform is designed for students looking for
                educational support and scholarship opportunities.
              </p>
            </div>

            <div className="about-card">
              <div className="feature-icon">
                <BookOpen size={27} />
              </div>

              <h2>How It Works</h2>

              <p>
                Students provide basic information, answer a few
                questions, and complete the application process.
              </p>
            </div>
          </section>

          <section className="about-note">
            <LockKeyhole size={24} />

            <div>
              <h3>Demo Project</h3>
              <p>
                ScholarGrant PH is a fictional scholarship website
                created for entertainment and demonstration.
                It does not process real scholarship applications.
              </p>
            </div>
          </section>
        </main>
      )}

      {/* APPLICATION PAGE */}
      {page === "application" && (
        <main className="inner-page application-page">
          <section className="page-header">
            <div className="hero-badge">
              <FileText size={16} />
              Scholarship Application
            </div>

            <h1>Tell us about yourself.</h1>

            <p>
              Complete the application form below to continue.
            </p>
          </section>

          <div className="application-wrapper">
            <form
              className="application-form"
              onSubmit={handleSubmit}
            >
              <div className="form-section">
                <div className="form-section-title">
                  <span>01</span>
                  <div>
                    <h2>Personal Information</h2>
                    <p>Tell us a little about yourself.</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Full Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        updateForm("name", e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Nickname <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={form.nickname}
                      onChange={(e) =>
                        updateForm("nickname", e.target.value)
                      }
                      placeholder="What should we call you?"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      Course / Program <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={form.course}
                      onChange={(e) =>
                        updateForm("course", e.target.value)
                      }
                      placeholder="e.g. BS Information Technology"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">
                  <span>02</span>
                  <div>
                    <h2>About Your Application</h2>
                    <p>Tell us why you are applying.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Why do you deserve this scholarship?{" "}
                    <span>*</span>
                  </label>

                  <textarea
                    value={form.reason}
                    onChange={(e) =>
                      updateForm("reason", e.target.value)
                    }
                    placeholder="Tell us about your goals and why this opportunity matters to you..."
                    rows="6"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-title">
                  <span>03</span>
                  <div>
                    <h2>Demo Security Check</h2>
                    <p>Optional field for the website demo.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Create a demo password</label>

                  <div className="password-input">
                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={form.prankPassword}
                      onChange={(e) =>
                        updateForm(
                          "prankPassword",
                          e.target.value
                        )
                      }
                      placeholder="Enter a fake password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <p className="input-note">
                    Use a fake password only. This field is never
                    read, stored, or sent anywhere.
                  </p>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="primary-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Processing...
                      <Terminal size={18} />
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* LOADING PAGE */}
      {loading && (
        <div className="loading-overlay">
          <div className="terminal-box">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span>scholargrant-terminal</span>
            </div>

            <div className="terminal-content">
              <div className="terminal-title">
                <Terminal size={20} />
                Processing Application
              </div>

              {terminalLines.map((line, index) => (
                <div
                  className="terminal-line"
                  key={index}
                >
                  <span>&gt;</span>
                  {line}
                  {index === terminalLines.length - 1 && (
                    <span className="cursor">_</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVEAL PAGE */}
      {page === "reveal" && submitted && (
        <main className="reveal-page">
          <div className="reveal-card">
            <div className="reveal-icon">
              <Sparkles size={42} />
            </div>

            <span className="reveal-label">
              APPLICATION COMPLETE
            </span>

            <h1>
              GOTCHA! 😭
            </h1>

            <p className="reveal-main">
              You just got pranked.
            </p>

            <p className="reveal-text">
              There is no scholarship application here.
              ScholarGrant PH is a fictional website made for
              entertainment.
            </p>

            <div className="reveal-info">
              <CheckCircle size={20} />

              <span>
                Your demo password was not read, stored, or sent
                anywhere.
              </span>
            </div>

            <div className="reveal-buttons">
              <button
                className="primary-button"
                onClick={resetApplication}
              >
                <RotateCcw size={18} />
                Try Again
              </button>

              <button
                className="secondary-button"
                onClick={() => goTo("home")}
              >
                Back Home
              </button>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-icon">
              <GraduationCap size={22} />
            </div>

            <div>
              <strong>ScholarGrant PH</strong>
              <span>Student Opportunity Portal</span>
            </div>
          </div>

          <div className="footer-text">
            <p>
              © 2026 ScholarGrant PH. Demo website for
              entertainment.
            </p>

            <p>
              This is a fictional scholarship website. No real
              scholarship application is submitted.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;