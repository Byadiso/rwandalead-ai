import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { registerUser } from "../services/auth";
import "../styles/auth.css";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UX Interaction States
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation guard
    if (!fullName || !email || !password) {
      setFeedback({ type: "error", message: "Please complete all fields to establish your account." });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ type: null, message: "" });
      
      await registerUser({
        full_name: fullName,
        email: email,
        password: password,
      });

      setFeedback({ 
        type: "success", 
        message: "Account established successfully! Provisioning your workspace profile..." 
      });
      
      // Reset inputs upon platform registration clearance
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setFeedback({ 
        type: "error", 
        message: err?.message || "Registration failed. Verify server authorization or try another email identifier." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        
        {/* Core Product Branding Signature */}
        <div className="auth-header">
          <div className="brand-logo">
            <Sparkles size={22} className="logo-icon" />
          </div>
          <h1>Create your Account</h1>
          <p>Get immediate access to AI-driven enterprise deal discovery tools.</p>
        </div>

        {/* Real-time Inline Status Banners */}
        {feedback.message && (
          <div className={`feedback-banner ${feedback.type}`}>
            {feedback.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Controlled Form Element Tree */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <User size={16} className="input-field-icon" />
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                disabled={isSubmitting}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Work Email</label>
            <div className="input-wrapper">
              <Mail size={16} className="input-field-icon" />
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={16} className="input-field-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="spinner-loader" />
                <span>Creating Workspace...</span>
              </>
            ) : (
              <span>Register Account</span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already registered? <a href="/login">Sign in here</a></p>
        </div>

      </div>
    </div>
  );
}