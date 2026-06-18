import { useEffect, useState } from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Target,
  Loader2,
  Inbox
} from "lucide-react";
import { getAnalysis } from "../services/analysis";
import "./LeadAnalysis.css";

export default function LeadAnalysis({ leadId }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!leadId) {
      setAnalysis(null);
      return;
    }
    loadAnalysis();
  }, [leadId]);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAnalysis(leadId);
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load intelligence data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // State: Empty / No Lead Selected
  if (!leadId) {
    return (
      <div className="analysis-state-card empty-state">
        <div className="state-icon-wrapper">
          <Inbox size={24} />
        </div>
        <h3>No Lead Selected</h3>
        <p>Select an active lead from your pipeline to unlock tailored AI diagnostics and opportunity metrics.</p>
      </div>
    );
  }

  // State: Loading Diagnostic
  if (loading) {
    return (
      <div className="analysis-state-card loading-state">
        <Loader2 className="state-spinner" size={32} />
        <h3>Synthesizing Diagnostics...</h3>
        <p>AI is cross-referencing growth discrepancies and calculating revenue parameters.</p>
      </div>
    );
  }

  // State: Error
  if (error) {
    return (
      <div className="analysis-state-card error-state">
        <AlertTriangle size={28} className="error-icon" />
        <h3>Analysis Interrupted</h3>
        <p>{error}</p>
        <button onClick={loadAnalysis} className="retry-btn">Retry Analysis</button>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="analysis-premium-card">
      {/* Header Panel */}
      <div className="analysis-header">
        <div className="header-meta">
          <div className="badge-ai">
            <Sparkles size={12} />
            <span>AI Augmented</span>
          </div>
          <h2>Opportunity Intelligence</h2>
          <p>Automated market gap analysis and business strategy models</p>
        </div>
        
        <div className="score-container">
          <div className="score-circle">
            <span className="score-number">{analysis.opportunity_score}</span>
            <span className="score-label">Match</span>
          </div>
        </div>
      </div>

      {/* Main Structural Split Layout */}
      <div className="analysis-grid">
        {/* Problems Block */}
        <div className="analysis-section problems-block">
          <div className="section-title-row">
            <AlertTriangle size={16} className="title-icon text-red" />
            <h3>Identified Friction Points</h3>
          </div>
          <ul className="analysis-list">
            {analysis.problems?.map((problem, i) => (
              <li key={i}>
                <span className="bullet-indicator red-dot"></span>
                <span className="list-text">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Block */}
        <div className="analysis-section services-block">
          <div className="section-title-row">
            <CheckCircle2 size={16} className="title-icon text-teal" />
            <h3>Recommended Core Services</h3>
          </div>
          <ul className="analysis-list">
            {analysis.services?.map((service, i) => (
              <li key={i}>
                <span className="bullet-indicator teal-dot"></span>
                <span className="list-text">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Financial Valuation Segment */}
      <div className="deal-valuation-card">
        <div className="deal-icon-bg">
          <Target size={20} />
        </div>
        <div className="deal-info">
          <div className="deal-label">Estimated Pipeline Valuation</div>
          <div className="deal-value-row">
            <DollarSign size={24} className="currency-symbol" />
            <span className="deal-value">
              {Number(analysis.estimated_value) ? Number(analysis.estimated_value).toLocaleString() : analysis.estimated_value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}