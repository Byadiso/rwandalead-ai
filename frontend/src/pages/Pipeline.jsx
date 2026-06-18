import { useEffect, useState } from "react";
import { 
  BarChart3, 
  MapPin, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Loader2,
  TrendingUp
} from "lucide-react";
import { getLeads, updateLeadStage } from "../services/lead";
import Layout from "../components/Layout";
import "../styles/pipeline.css";

export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const stages = ["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"];

  const loadLeads = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      const data = await getLeads();
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching pipeline leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const moveLead = async (leadId, stage) => {
    try {
      setUpdatingId(leadId);
      await updateLeadStage(leadId, stage);
      // Silently reload data without flashing a global screen loader
      await loadLeads(false);
    } catch (error) {
      console.error("Error moving stage:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getCount = (stage) => {
    return leads.filter((lead) => lead.pipeline_stage === stage).length;
  };

  // Capitalize format helper for pipeline headers and badges
  const formatStageText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <Layout>
      <div className="pipeline-page">
        {/* Modern Platform Banner Header */}
        <div className="pipeline-header">
          <div className="header-title-block">
            <div className="header-icon-badge">
              <Layers size={20} />
            </div>
            <div>
              <h1>Deal Pipeline</h1>
              <p>Track, sort, and advance AI-qualified enterprise opportunities.</p>
            </div>
          </div>
        </div>

        {/* Analytic Aggregate Summary Cards */}
        <div className="pipeline-stats">
          <div className="stat-card">
            <div className="stat-meta">
              <span className="stat-label">Total Volume</span>
              <TrendingUp size={16} className="text-slate" />
            </div>
            <div className="stat-number">{leads.length}</div>
          </div>
          {stages.slice(0, 4).map((stage) => (
            <div className="stat-card" key={stage}>
              <div className="stat-meta">
                <span className="stat-label">{formatStageText(stage)}</span>
                <span className={`status-indicator-dot ${stage.toLowerCase()}`} />
              </div>
              <div className="stat-number">{getCount(stage)}</div>
            </div>
          ))}
        </div>

        {/* Global Loading Block */}
        {loading ? (
          <div className="pipeline-loading-viewport">
            <Loader2 size={36} className="spinner-loader" />
            <p>Constructing pipeline matrix...</p>
          </div>
        ) : (
          /* Kanban Board Viewport Matrix */
          <div className="kanban-board">
            {stages.map((stage) => {
              const stageLeads = leads.filter((l) => l.pipeline_stage === stage);

              return (
                <div key={stage} className={`kanban-column stage-${stage.toLowerCase()}`}>
                  <div className="column-header">
                    <div className="column-title-wrap">
                      <span className="column-dot-marker" />
                      <h3>{formatStageText(stage)}</h3>
                    </div>
                    <span className="column-count">{stageLeads.length}</span>
                  </div>

                  <div className="column-body">
                    {stageLeads.length === 0 ? (
                      <div className="column-empty-placeholder">No deals here</div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div key={lead.id} className="pipeline-card">
                          {/* Card Interactive Overlay Loading Tint */}
                          {updatingId === lead.id && (
                            <div className="card-updating-dimmer">
                              <Loader2 size={16} className="spinner-loader" />
                            </div>
                          )}

                          <div className="card-top">
                            <div className="card-identity">
                              <h4 className="business-name">{lead.business_name}</h4>
                              <div className="business-city">
                                <MapPin size={12} />
                                <span>{lead.city || "Rwanda"}</span>
                              </div>
                            </div>
                            <span className={`priority-badge ${lead.priority?.toLowerCase() || "low"}`}>
                              {lead.priority || "Low"}
                            </span>
                          </div>

                          {/* Premium Segmented Feature Boxes */}
                          <div className="score-box">
                            <div className="score-label">
                              <Sparkles size={12} />
                              <span>AI Fit Score</span>
                            </div>
                            <span className="score-value">{lead.opportunity_score || "N/A"}</span>
                          </div>

                          {lead.service_gap && (
                            <div className="service-gap">
                              <span className="gap-tag-prefix">Gap:</span>
                              <p className="gap-text">{lead.service_gap}</p>
                            </div>
                          )}

                          {/* Refactored Clean Stage Controller Select */}
                          <div className="select-container">
                            <select
                              className="pipeline-select"
                              value={lead.pipeline_stage}
                              onChange={(e) => moveLead(lead.id, e.target.value)}
                            >
                              {stages.map((s) => (
                                <option key={s} value={s}>
                                  Move to {formatStageText(s)}
                                </option>
                              ))}
                            </select>
                            <ChevronRight size={14} className="select-arrow-icon" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}