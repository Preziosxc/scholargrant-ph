import { useState, useEffect } from "react";
import API from "./api";
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  LockKeyhole,
  Terminal,
  Sparkles,
  Home,
  FileText,
  Gift,
  AlertTriangle,
  Eye,
  EyeOff,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import "./index.css";

function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    course: "",
    reason: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const goTo = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startApplication = () => {
    setErrors({});
    goTo("apply");
  };

  const submitApplication = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.nickname.trim()) newErrors.nickname = "Please enter a nickname.";
    if (!form.course.trim()) newErrors.course = "Please enter your course.";
    if (!form.reason.trim()) newErrors.reason = "Please enter your reason.";
    if (!form.password.trim()) newErrors.password = "Please enter a password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await API.post("/applications", {
        name: form.name,
        nickname: form.nickname,
        course: form.course,
        reason: form.reason,
        password: form.password,
      });

      console.log("Saved to DB:", response.data);

      setProgress(0);
      setStage(0);
      goTo("loading");
    } catch (error) {
      console.error("Submit failed:", error.response?.data || error.message);

      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to submit. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (page !== "loading") return;

    setProgress(0);
    setStage(0);

    const progressTimer = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(previous + 2, 100);
      });
    }, 70);

    const stageTimer = setInterval(() => {
      setStage((previous) => Math.min(previous + 1, 4));
    }, 700);

    const revealTimer = setTimeout(() => {
      setPage("reveal");
    }, 4700);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stageTimer);
      clearTimeout(revealTimer);
    };
  }, [page]);

  const resetApp = () => {
    setForm({
      name: "",
      nickname: "",
      course: "",
      reason: "",
      password: "",
    });
    setErrors({});
    setProgress(0);
    setStage(0);
    setShowPassword(false);
    goTo("home");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div
          className="brand"
          onClick={() => goTo("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") goTo("home");
          }}
        >
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>
          <div>
            <strong>ScholarGrant</strong>
            <span>PH</span>
          </div>
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("about")}>About</button>
          <button onClick={startApplication} className="nav-apply">
            Apply Now <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      {page === "home" && <HomePage onApply={startApplication} />}

      {page === "about" && <AboutPage onApply={startApplication} />}

      {page === "apply" && (
        <ApplicationPage
          form={form}
          updateForm={updateForm}
          submitApplication={submitApplication}
          errors={errors}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      )}

      {page === "loading" && (
        <LoadingPage progress={progress} stage={stage} />
      )}

      {page === "reveal" && (
        <RevealPage nickname={form.nickname} onReset={resetApp} />
      )}

      <footer className="footer">
        <div className="footer-brand">
          <GraduationCap size={22} />
          <strong>ScholarGrant PH</strong>
        </div>
        <p>© 2026 ScholarGrant PH. Demo website for entertainment.</p>
        <p className="footer-note">
          This is a fictional scholarship website. No real scholarship
          application is submitted.
        </p>
      </footer>
    </div>
  );
}

function HomePage({ onApply }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="announcement">
            <Sparkles size={15} />
            <span>Scholarship applications are now open</span>
          </div>

          <h1>
            Invest in your
            <br />
            <span>bright future.</span>
          </h1>

          <p>
            Discover opportunities that help students achieve their
            educational dreams. Your journey to success starts here.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={onApply}>
              Apply for Scholarship <ArrowRight size={18} />
            </button>
            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById("benefits")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>

          <div className="hero-trust">
            <div className="avatar-stack">
              <span>J</span>
              <span>M</span>
              <span>A</span>
              <span>+</span>
            </div>
            <div>
              <strong>Join student applicants</strong>
              <small>Start your application today</small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>
          <div className="student-card">
            <div className="student-card-top">
              <span className="mini-label">SCHOLARGRANT PH</span>
              <ShieldCheck size={22} />
            </div>
            <div className="cap-circle">
              <GraduationCap size={74} />
            </div>
            <h3>Build Your Future</h3>
            <p>Education opens doors to endless possibilities.</p>
            <div className="card-divider"></div>
            <div className="card-info">
              <div>
                <small>Application</small>
                <strong>Online</strong>
              </div>
              <div>
                <small>Program</small>
                <strong>Student Aid</strong>
              </div>
            </div>
          </div>

          <div className="floating-card floating-top">
            <CheckCircle size={22} />
            <div>
              <strong>Student Friendly</strong>
              <small>Easy application</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <Gift size={23} />
            <div>
              <strong>Scholarship</strong>
              <small>Opportunities await</small>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div>
          <strong>100%</strong>
          <span>Online Application</span>
        </div>
        <div>
          <strong>3+</strong>
          <span>Student Benefits</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Application Access</span>
        </div>
      </section>

      <section className="benefits-section" id="benefits">
        <div className="section-heading">
          <span className="eyebrow">WHY SCHOLARGRANT PH?</span>
          <h2>Support for your student journey.</h2>
          <p>Explore a simple way to discover educational opportunities.</p>
        </div>

        <div className="benefit-grid">
          <BenefitCard
            icon={<BookOpen />}
            title="Educational Support"
            text="Explore opportunities designed to support your learning goals."
          />
          <BenefitCard
            icon={<Users />}
            title="Student Community"
            text="Connect with opportunities and build your future."
          />
          <BenefitCard
            icon={<ShieldCheck />}
            title="Simple Application"
            text="Complete a clear and easy-to-follow application form."
          />
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
          <h2>Ready to take the next step?</h2>
          <p>Start your scholarship application today.</p>
        </div>
        <button className="primary-button light-button" onClick={onApply}>
          Start Application <ArrowRight size={18} />
        </button>
      </section>
    </>
  );
}

function BenefitCard({ icon, title, text }) {
  return (
    <div className="benefit-card">
      <div className="benefit-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="benefit-arrow">
        <ArrowRight size={18} />
      </span>
    </div>
  );
}

function AboutPage({ onApply }) {
  return (
    <main className="simple-page">
      <div className="page-heading">
        <span className="eyebrow">ABOUT US</span>
        <h1>Education creates possibilities.</h1>
        <p>
          ScholarGrant PH is a fictional scholarship portal created as a
          student project and entertainment demo.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-box">
          <GraduationCap size={35} />
          <h3>Our Mission</h3>
          <p>
            To create a simple and welcoming online experience for students
            exploring educational opportunities.
          </p>
        </div>

        <div className="about-box">
          <ShieldCheck size={35} />
          <h3>Our Promise</h3>
          <p>
            This demo does not process real scholarship applications or
            collect real passwords.
          </p>
        </div>
      </div>

      <button className="primary-button" onClick={onApply}>
        Apply Now <ArrowRight size={18} />
      </button>
    </main>
  );
}

function ApplicationPage({
  form,
  updateForm,
  submitApplication,
  errors,
  showPassword,
  setShowPassword,
}) {
  return (
    <main className="application-page">
      <div className="form-intro">
        <span className="eyebrow">SCHOLARSHIP APPLICATION</span>

        <h1>Start your application.</h1>

        <p>Complete the form below to continue your scholarship application.</p>
      </div>

      <div className="form-layout">
        {/* LEFT SIDE - APPLICATION FORM */}
        <div className="application-form-card">
          <div className="form-card-heading">
            <div className="form-heading-icon">
              <FileText size={23} />
            </div>

            <div>
              <h2>Student Information</h2>
              <p>Fill in your details to continue.</p>
            </div>
          </div>

          <form onSubmit={submitApplication}>
            {/* NAME AND NICKNAME */}
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="name">Full Name</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Juan Dela Cruz"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                />

                {errors.name && <small className="error">{errors.name}</small>}
              </div>

              <div className="form-field">
                <label htmlFor="nickname">Nickname</label>

                <input
                  id="nickname"
                  type="text"
                  placeholder="Your nickname"
                  value={form.nickname}
                  onChange={(e) => updateForm("nickname", e.target.value)}
                />

                {errors.nickname && (
                  <small className="error">{errors.nickname}</small>
                )}
              </div>
            </div>

            {/* COURSE */}
            <div className="form-field">
              <label htmlFor="course">Course / Program</label>

              <input
                id="course"
                type="text"
                placeholder="e.g. BS Information Technology"
                value={form.course}
                onChange={(e) => updateForm("course", e.target.value)}
              />

              {errors.course && <small className="error">{errors.course}</small>}
            </div>

            {/* REASON */}
            <div className="form-field">
              <label htmlFor="reason">Why do you want this scholarship?</label>

              <textarea
                id="reason"
                rows="4"
                placeholder="Tell us about your educational goals..."
                value={form.reason}
                onChange={(e) => updateForm("reason", e.target.value)}
              />

              {errors.reason && <small className="error">{errors.reason}</small>}
            </div>

            {/* PASSWORD */}
            <div className="fake-password-box">
              <div className="fake-password-title">
                <LockKeyhole size={19} />

                <div>
                  <strong>Account Security</strong>
                  <small>Create a password for your application</small>
                </div>
              </div>

              <label htmlFor="password">Create Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.password && (
                <small className="error">{errors.password}</small>
              )}

              <p className="safe-note">
                <ShieldCheck size={15} />
                Create a secure password for your application.
              </p>
            </div>

            {/* SUBMIT ERROR */}
            {errors.submit && (
              <p
                style={{
                  color: "#dc2626",
                  marginBottom: "12px",
                  fontSize: "0.9rem",
                }}
              >
                {errors.submit}
              </p>
            )}

            {/* SUBMIT */}
            <button className="primary-button submit-button" type="submit">
              Submit Application
              <ArrowRight size={18} />
            </button>

            <p className="form-disclaimer">
              Please review your information before submitting your
              application.
            </p>
          </form>
        </div>

        {/* RIGHT SIDE - SCHOLARSHIP INFORMATION */}
        <aside className="form-side">
          <div className="side-icon">
            <ShieldCheck size={30} />
          </div>

          <h3>Scholarship Application</h3>

          <p>
            Complete your application carefully and provide accurate
            information to help us review your scholarship request.
          </p>

          <div className="side-list">
            <div>
              <CheckCircle size={17} />
              <span>Simple online application</span>
            </div>

            <div>
              <CheckCircle size={17} />
              <span>Student-focused opportunities</span>
            </div>

            <div>
              <CheckCircle size={17} />
              <span>Application review process</span>
            </div>
          </div>

          <div className="side-tip">
            <AlertTriangle size={18} />
            <span>Please review your information before submitting.</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function LoadingPage({ progress, stage }) {
  const messages = [
    "Initializing scholarship verification...",
    "Checking application information...",
    "Analyzing student eligibility...",
    "Connecting to scholarship database...",
    "Preparing your application result...",
  ];

  return (
    <main className="loading-page">
      <div className="terminal-card">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="terminal-title">
            <Terminal size={15} />
            SCHOLARGRANT_TERMINAL
          </div>
          <span className="terminal-status">ONLINE</span>
        </div>

        <div className="terminal-body">
          <div className="terminal-logo">
            <div className="terminal-logo-ring">
              <ShieldCheck size={42} />
            </div>
          </div>

          <p className="terminal-command">
            <span className="green-text">guest@scholargrant</span>
            <span className="terminal-white">:~$ </span>
            verify_application
          </p>

          <div className="terminal-lines">
            {messages.slice(0, stage + 1).map((message, index) => (
              <p key={message}>
                <span className="green-text">[{index + 1}]</span> {message}{" "}
                <span className="terminal-success">OK</span>
              </p>
            ))}
          </div>

          <div className="terminal-progress">
            <div className="progress-label">
              <span>VERIFICATION PROGRESS</span>
              <strong>{progress}%</strong>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="terminal-wait">
            <span className="blink-dot"></span>
            Please wait while we process your application...
          </div>
        </div>
      </div>
    </main>
  );
}

function RevealPage({ nickname, onReset }) {
  return (
    <main className="reveal-page">
      <div className="reveal-card">
        <div className="reveal-icon">
          <span>😂</span>
        </div>

        <div className="reveal-badge">
          <Sparkles size={15} /> APPLICATION COMPLETE
        </div>

        <h1>
          Congratulations,
          <br />
          <span>{nickname || "Student"}!</span>
        </h1>

        <div className="reveal-terminal">
          <div className="reveal-terminal-header">
            <Terminal size={17} />
            SCHOLARGRANT_SYSTEM
            <span className="terminal-success">[ACCESS GRANTED]</span>
          </div>
          <div className="reveal-terminal-content">
            <p>
              <span className="green-text">&gt;</span> Student found!
            </p>
            <p>
              <span className="green-text">&gt;</span> Scholarship status:
              <strong> APPROVED</strong>
            </p>
            <p>
              <span className="green-text">&gt;</span> Future status:
              <strong> BRIGHT ✨</strong>
            </p>
          </div>
        </div>

        <div className="prank-reveal-box">
          <div className="prank-big-icon">🎉</div>
          <h2>JUST KIDDING! 😂</h2>
          <p>You have been successfully hacked!</p>
          <p className="reveal-subtext">
            This was only a fake scholarship website.
            <br />
          </p>
        </div>

        <div className="reveal-message">
          <ShieldCheck size={18} />
          <span>Your privacy is safe.</span>
        </div>

        <button className="primary-button" onClick={onReset}>
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    </main>
  );
}

export default App;