import { useEffect, useState } from "react";
import { 
  Sparkles, 
  Mail, 
  MessageSquare, 
  FileText, 
  Copy, 
  Check, 
  Loader2, 
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { generateOutreach } from "../services/outreach";
import "../styles/OutreachGenerator.css";

export default function OutreachGenerator({ leadId }) {
  const [outreach, setOutreach] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Tab State: "email" | "whatsapp" | "proposal"
  const [activeTab, setActiveTab] = useState("email");
  // Clipboard UI State tracking
  const [copiedSection, setCopiedSection] = useState("");

  useEffect(() => {
    if (!leadId) {
      setOutreach(null);
      return;
    }
    loadOutreach();
  }, [leadId]);

  const loadOutreach = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await generateOutreach(leadId);
      setOutreach(data);
    } catch (err) {
      console.error(err);
      setError("AI generation failed. Please verify pipeline details and retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async (text, sectionKey) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionKey);
      setTimeout(() => setCopiedSection(""), 2000); // Reset badge after 2s
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  if (!leadId) return null;

  // Loading State layout
  if (loading) {
    return (
      <div className="outreach-state-box loading">
        <Loader2 className="spinner-loader" size={24} />
        <p>Drafting hyper-personalized omnichannel copy...</p>
      </div>
    );
  }

  // Error State layout
  if (error) {
    return (
      <div className="outreach-state-box error">
        <AlertCircle size={24} className="text-red" />
        <p>{error}</p>
        <button onClick={loadOutreach} className="retry-action-btn">
          <RefreshCw size={14} />
          <span>Regenerate Content</span>
        </button>
      </div>
    );
  }

  if (!outreach) return null;

  return (
    <div className="outreach-premium-card">
      {/* Structural Header Section */}
      <div className="outreach-header">
        <div className="outreach-title">
          <Sparkles size={16} className="text-purple" />
          <h3>AI Outreach Material</h3>
        </div>
        <p className="outreach-subtitle">Tailored contextual messages targeting local business operational gaps</p>
      </div>

      {/* Modern Segmented Navigation Bar Tab Strip */}
      <div className="outreach-tabs">
        <button 
          className={`tab-btn ${activeTab === "email" ? "active" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          <Mail size={14} />
          <span>Cold Email</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === "whatsapp" ? "active" : ""}`}
          onClick={() => setActiveTab("whatsapp")}
        >
          <MessageSquare size={14} />
          <span>WhatsApp Chat</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === "proposal" ? "active" : ""}`}
          onClick={() => setActiveTab("proposal")}
        >
          <FileText size={14} />
          <span>Proposal Core</span>
        </button>
      </div>

      {/* Dynamic Tab Pane Viewport Panels Container */}
      <div className="outreach-content-pane">
        
        {/* Email Active Display Panel */}
        {activeTab === "email" && (
          <div className="pane-inner">
            <div className="pane-toolbar">
              <span className="pane-meta-label">B2B Sales Sequence Draft</span>
              <button 
                className={`copy-action-btn ${copiedSection === "email" ? "success" : ""}`}
                onClick={() => handleCopyToClipboard(outreach.email, "email")}
              >
                {copiedSection === "email" ? (
                  <>
                    <Check size={14} /> <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} /> <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>
            <textarea 
              className="outreach-textarea"
              rows={12}
              value={outreach.email || ""} 
              readOnly 
              placeholder="No email template context data generated."
            />
          </div>
        )}

        {/* WhatsApp Active Display Panel */}
        {activeTab === "whatsapp" && (
          <div className="pane-inner">
            <div className="pane-toolbar">
              <span className="pane-meta-label">Direct Instant Message Text</span>
              <button 
                className={`copy-action-btn ${copiedSection === "whatsapp" ? "success" : ""}`}
                onClick={() => handleCopyToClipboard(outreach.whatsapp, "whatsapp")}
              >
                {copiedSection === "whatsapp" ? (
                  <>
                    <Check size={14} /> <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} /> <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>
            <textarea 
              className="outreach-textarea"
              rows={6}
              value={outreach.whatsapp || ""} 
              readOnly 
              placeholder="No short message context data generated."
            />
          </div>
        )}

        {/* Proposal Summary Active Display Panel */}
        {activeTab === "proposal" && (
          <div className="pane-inner">
            <div className="pane-toolbar">
              <span className="pane-meta-label">Value Proposition & Brief Summary</span>
              <button 
                className={`copy-action-btn ${copiedSection === "proposal" ? "success" : ""}`}
                onClick={() => handleCopyToClipboard(outreach.proposal, "proposal")}
              >
                {copiedSection === "proposal" ? (
                  <>
                    <Check size={14} /> <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} /> <span>Copy Executive Pitch</span>
                  </>
                )}
              </button>
            </div>
            <textarea 
              className="outreach-textarea"
              rows={12}
              value={outreach.proposal || ""} 
              readOnly 
              placeholder="No technical proposal summaries generated."
            />
          </div>
        )}
        
      </div>
    </div>
  );
}