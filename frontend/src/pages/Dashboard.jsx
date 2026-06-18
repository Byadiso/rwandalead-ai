import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../dashboard.css";

import { 
  TrendingUp, 
  Layers, 
  AlertCircle, 
  DollarSign, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Coins,
  ChevronRight
} from "lucide-react";

import { getMe } from "../services/user";
import { getCampaigns } from "../services/campaigns";
import { getLeads } from "../services/lead";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [leads, setLeads] = useState([]);

  const loadData = async () => {
    try {
      const me = await getMe();
      setUser(me);

      const campaignData = await getCampaigns();
      setCampaigns(campaignData);

      const leadData = await getLeads();
      setLeads(leadData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!user) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Intelligence Dashboard...</p>
        </div>
      </Layout>
    );
  }

  const highPriority = leads.filter(lead => lead.priority === "High").length;
  const mediumPriority = leads.filter(lead => lead.priority === "Medium").length;
  const lowPriority = leads.filter(lead => lead.priority === "Low").length;

  return (
    <Layout>
      <div className="dashboard-page">
        {/* Hero Section */}
        <div className="hero">
          <div>
            <h1>Tourism Growth Intelligence</h1>
            <p>Welcome back, {user.full_name}</p>
          </div>
          <div className="credits-badge">
            <Coins size={16} className="badge-icon" />
            <span>{user.credits} Credits</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span>Total Leads</span>
              <div className="icon-wrapper blue"><Layers size={20} /></div>
            </div>
            <h2>{leads.length}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Active Campaigns</span>
              <div className="icon-wrapper purple"><Briefcase size={20} /></div>
            </div>
            <h2>{campaigns.length}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>High Priority</span>
              <div className="icon-wrapper red"><AlertCircle size={20} /></div>
            </div>
            <h2>{highPriority}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Revenue Potential</span>
              <div className="icon-wrapper gold"><DollarSign size={20} /></div>
            </div>
            <h2>${(highPriority * 500).toLocaleString()}</h2>
          </div>
        </div>

        {/* Mid-Grid Operations */}
        <div className="dashboard-grid">
          {/* Pipeline */}
          <div className="card">
            <div className="card-header">
              <TrendingUp size={18} className="card-header-icon" />
              <div className="card-title">Lead Pipeline</div>
            </div>
            <div className="pipeline">
              <div className="pipeline-box high-box">
                <h4>High Priority</h4>
                <span>{highPriority}</span>
              </div>
              <div className="pipeline-box medium-box">
                <h4>Medium Priority</h4>
                <span>{mediumPriority}</span>
              </div>
              <div className="pipeline-box low-box">
                <h4>Low Priority</h4>
                <span>{lowPriority}</span>
              </div>
            </div>
          </div>

          {/* Premium AI Card */}
          <div className="ai-card">
            <div className="ai-card-header">
              <Sparkles size={20} className="sparkle-icon" />
              <h3>AI Opportunity Analysis</h3>
            </div>
            <ul className="ai-list">
              <li>
                <span className="ai-bullet"></span>
                <strong>{leads.filter(l => l.service_gap?.includes("Website")).length}</strong> businesses missing web presence.
              </li>
              <li>
                <span className="ai-bullet"></span>
                <strong>{highPriority}</strong> premium high-conversion opportunities ready.
              </li>
              <li>
                <span className="ai-bullet"></span>
                Expected closing rate: <span className="highlight-text">8% - 12%</span>
              </li>
              <li>
                <span className="ai-bullet"></span>
                Est. Monthly Value: <span className="highlight-text">${(highPriority * 500).toLocaleString()}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Tables / Bottom Grid */}
        <div className="bottom-grid">
          {/* Opportunities */}
          <div className="card">
            <div className="card-title">Latest Opportunities</div>
            <div className="opportunity-list">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="opportunity-row">
                  <div className="opp-info">
                    <strong>{lead.business_name}</strong>
                    <p><MapPin size={12} className="inline-icon" /> {lead.city}</p>
                  </div>
                  <div className="opp-action">
                    <span className="score">Match Score: {lead.opportunity_score}</span>
                    <ChevronRight size={16} className="row-arrow" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaigns */}
          <div className="card">
            <div className="card-title">Recent Campaigns</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Target City</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.slice(0, 5).map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="font-medium">{campaign.name}</td>
                      <td>{campaign.city}</td>
                      <td>
                        <span className={`status status-${campaign.status?.toLowerCase()}`}>
                          <span className="status-dot"></span>
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}