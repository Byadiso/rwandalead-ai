import { useEffect, useState } from "react";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  ShieldAlert, 
  Layers, 
  Sparkles, 
  Terminal,
  Activity,
  UserCheck
} from "lucide-react";
import { getLeads, updateLeadStage } from "../services/lead";
import OutreachGenerator from "../components/Outreach";
import LeadAnalysis from "../components/LeadAnalysis";
import Layout from "../components/Layout";
import "../styles/leads.css";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data || []);
      // Auto-select first item if none is selected for a premium onboarding feel
      if (data && data.length > 0 && !selectedLead) {
        setSelectedLead(data[0].id);
      }
    } catch (error) {
      console.error("Failed loading platform leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const changeStage = async (leadId, stage, e) => {
    // Stop select click from altering active row selections
    e.stopPropagation();
    try {
      await updateLeadStage(leadId, stage);
      await loadLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = leads.filter((lead) =>
    lead.business_name?.toLowerCase().includes(search.toLowerCase())
  );

  const highPriority = leads.filter((l) => l.priority === "High").length;
  const mediumPriority = leads.filter((l) => l.priority === "Medium").length;
  const lowPriority = leads.filter((l) => l.priority === "Low").length;

  return (
    <Layout>
      <div className="leads-page">
        {/* Main Content Title Area */}
        <div className="page-header">
          <div>
            <h1>Leads Workspace</h1>
            <p>Qualify target infrastructure gaps and generate instant pipeline action items.</p>
          </div>
        </div>

        {/* Dashboard Aggregate Stat Counters */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-meta">
              <span className="stat-label">Total Index</span>
              <Activity size={14} className="icon-subtle" />
            </div>
            <div className="stat-number">{leads.length}</div>
          </div>
          <div className="stat-card border-high">
            <div className="stat-meta">
              <span className="stat-label">High Priority</span>
              <ShieldAlert size={14} className="text-high" />
            </div>
            <div className="stat-number color-high">{highPriority}</div>
          </div>
          <div className="stat-card border-medium">
            <div className="stat-meta">
              <span className="stat-label">Medium Priority</span>
              <Layers size={14} className="text-medium" />
            </div>
            <div className="stat-number color-medium">{mediumPriority}</div>
          </div>
          <div className="stat-card border-low">
            <div className="stat-meta">
              <span className="stat-label">Low Priority</span>
              <UserCheck size={14} className="text-low" />
            </div>
            <div className="stat-number color-low">{lowPriority}</div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="toolbar">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Filter assets by organization name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Workspace Dual Layout Grid System */}
        <div className="workspace-grid">
          {/* Data Table Core Frame */}
          <div className="leads-card">
            {loading ? (
              <div className="table-loading">Gathering workspace indices...</div>
            ) : filtered.length === 0 ? (
              <div className="table-empty">No organizations match your active parameters.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Organization / Market Segment</th>
                    <th>Priority</th>
                    <th>Fit Score</th>
                    <th>Identified Deficit</th>
                    <th>Action Step</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      className={selectedLead === lead.id ? "selected-row" : ""}
                      onClick={() => setSelectedLead(lead.id)}
                    >
                      <td>
                        <div className="business-cell">
                          <div className="business-avatar">
                            <Briefcase size={14} />
                          </div>
                          <div>
                            <div className="business-name">{lead.business_name}</div>
                            <div className="business-city">
                              <MapPin size={11} />
                              <span>{lead.city || "Kigali"}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`priority-badge ${lead.priority?.toLowerCase()}`}>
                          {lead.priority || "Low"}
                        </span>
                      </td>
                      <td>
                        <div className="score-cell-value">
                          <Sparkles size={12} className="text-teal" />
                          <span>{lead.opportunity_score || "N/A"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-gap-txt">{lead.service_gap || "None detected"}</div>
                      </td>
                      <td>
                        <select
                          className="stage-select"
                          value={lead.pipeline_stage}
                          onClick={(e) => e.stopPropagation()} // Prevents switching active cards on interaction
                          onChange={(e) => changeStage(lead.id, e.target.value, e)}
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="PROPOSAL">Proposal</option>
                          <option value="WON">Won</option>
                          <option value="LOST">Lost</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Interactive Context Intelligence Drawer Side Panel */}
          <div className="intelligence-panel">
            {selectedLead ? (
              <div className="panel-inner-scroller">
                <LeadAnalysis leadId={selectedLead} />
                <OutreachGenerator leadId={selectedLead} />
              </div>
            ) : (
              <div className="empty-panel-state">
                <Terminal size={24} />
                <h3>No Selection Made</h3>
                <p>Select a business record on your data grid to load contextual AI insight trees.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}