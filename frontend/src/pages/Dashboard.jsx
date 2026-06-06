import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../dashboard.css";

import { getMe } from "../services/user";

import {
  getCampaigns,
  createCampaign,
  runCampaign
} from "../services/campaigns";

import {
  getLeads
} from "../services/lead";

export default function Dashboard() {

  const [user, setUser] =
    useState(null);

  const [campaigns, setCampaigns] =
    useState([]);

  const [leads, setLeads] =
    useState([]);

  const [name, setName] =
    useState("");

  const [city, setCity] =
    useState("");

  const [niche, setNiche] =
    useState("");

  const loadData = async () => {

    try {

      const me =
        await getMe();

      setUser(me);

      const campaignData =
        await getCampaigns();

      setCampaigns(campaignData);

      const leadData =
        await getLeads();

      setLeads(leadData);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitCampaign =
    async (e) => {

      e.preventDefault();

      await createCampaign({
        name,
        city,
        niche
      });

      setName("");
      setCity("");
      setNiche("");

      loadData();
    };

  const handleRunCampaign =
    async (campaignId) => {

      await runCampaign(campaignId);

      loadData();
    };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout
      style={{
        padding: "40px"
      }}
    >

      <h1>
        RwandaLead AI
      </h1>

      <h3>
        Welcome {user.full_name}
      </h3>

      <hr />

      <div className="metrics">

  <div className="metric-card">

    <div>
      Campaigns
    </div>

    <div className="metric-value">
      {campaigns.length}
    </div>

  </div>

  <div className="metric-card">

    <div>
      Leads
    </div>

    <div className="metric-value">
      {leads.length}
    </div>

  </div>

  <div className="metric-card">

    <div>
      High Priority
    </div>

    <div className="metric-value">
      {
        leads.filter(
          l =>
          l.priority === "High"
        ).length
      }
    </div>

  </div>

  <div className="metric-card">

    <div>
      Credits
    </div>

    <div className="metric-value">
      {user.credits}
    </div>

  </div>

</div>

      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >

        <div className="section">

  <h2>
    Campaigns
  </h2>

  <table
    width="100%"
  >

    <thead>

      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

    </thead>

    <tbody>

      {campaigns.map(c => (

        <tr key={c.id}>

          <td>{c.name}</td>

          <td>{c.city}</td>

          <td>{c.status}</td>

          <td>

            <button
              onClick={() =>
                handleRunCampaign(
                  c.id
                )
              }
            >
              Run
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

        <div>
          <h3>
            Leads
          </h3>

          <p>
            {leads.length}
          </p>
        </div>

      </div>

      <hr />

      <h2>Create Campaign</h2>

      <form
        onSubmit={submitCampaign}
      >

        <input
          placeholder="Campaign Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          placeholder="Niche"
          value={niche}
          onChange={(e) =>
            setNiche(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Create Campaign
        </button>

      </form>

      <hr />

      <h2>Campaigns</h2>

      {campaigns.map((campaign) => (

        <div
          key={campaign.id}
          style={{
            border:
              "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px"
          }}
        >

          <h3>
            {campaign.name}
          </h3>

          <p>
            {campaign.city}
          </p>

          <p>
            {campaign.niche}
          </p>

          <p>
            Status:
            {" "}
            {campaign.status}
          </p>

          <button
            onClick={() =>
              handleRunCampaign(
                campaign.id
              )
            }
          >
            Run Discovery
          </button>

        </div>

      ))}

      <hr />

      <h2>Leads</h2>

      {leads.map((lead) => (

        <div
          key={lead.id}
          style={{
            border:
              "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <strong>
            {lead.business_name}
          </strong>

          <p>
            {lead.city}
          </p>

          <p>
            {lead.priority}
          </p>

          <p>
            {lead.service_gap}
          </p>

        </div>

      ))}

    </Layout>
  );
}