import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { loginUser } from "../services/auth";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Visual background elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="login-card">
        {/* Brand Header */}
        <div className="login-header">
          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>
          <h2>Welcome back</h2>
          <p>Enter your credentials to access your intelligence network</p>
        </div>

        {/* Error Callout */}
        {errorMessage && (
          <div className="login-error-badge">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Work Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                required
                disabled={isLoading}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                required
                disabled={isLoading}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="spinner-icon" size={18} />
            ) : (
              <>
                <span>Sign in to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an enterprise account? <a href="#contact">Contact Sales</a></p>
        </div>
      </div>
    </div>
  );
}