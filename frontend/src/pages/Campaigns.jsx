import { useEffect } from "react";
import { useState } from "react";

import "../styles/campaigns.css";

import {
  createCampaign,
  getCampaigns
} from "../services/campaigns";

import {
  runDiscovery
} from "../services/discovery";

export default function Campaigns() {

  const [campaigns, setCampaigns] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      city: "",
      niche: ""
    });

  const loadCampaigns =
    async () => {

      try {

        const data =
          await getCampaigns();

        setCampaigns(data);

      } catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    loadCampaigns();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createCampaign(form);

        setForm({
          name: "",
          city: "",
          niche: ""
        });

        loadCampaigns();

      } catch (error) {

        console.error(error);

      }
    };

  const handleRun =
    async (campaignId) => {

      try {

        const result =
          await runDiscovery(
            campaignId
          );

        alert(
          `${result.leads_found} leads found`
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (

<div className="page-container">

  <div className="page-header">

    <h1 className="page-title">
      Campaigns
    </h1>

    <p className="page-subtitle">
      Create and manage lead discovery campaigns.
    </p>

  </div>

  <div className="card">

    <div className="card-title">
      Create Campaign
    </div>

    <form onSubmit={handleSubmit}>

      <div className="form-grid">

        <input
          className="input"
          placeholder="Campaign Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          className="input"
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({
              ...form,
              city: e.target.value
            })
          }
        />

        <input
          className="input"
          placeholder="Niche"
          value={form.niche}
          onChange={(e) =>
            setForm({
              ...form,
              niche: e.target.value
            })
          }
        />

      </div>

      <div
        style={{
          marginTop: "20px"
        }}
      >
        <button
          className="btn"
          type="submit"
        >
          Create Campaign
        </button>
      </div>

    </form>

  </div>

  <div className="campaign-grid">

    {campaigns.map((campaign) => (

      <div
        key={campaign.id}
        className="campaign-card"
      >

        <div className="campaign-name">
          {campaign.name}
        </div>

        <div className="campaign-meta">
          📍 {campaign.city}
        </div>

        <div className="campaign-meta">
          🎯 {campaign.niche}
        </div>

        <div
          className={`status ${campaign.status}`}
        >
          {campaign.status}
        </div>

        <div className="actions">

          <button
            className="btn"
            onClick={() =>
              handleRun(campaign.id)
            }
          >
            Run Discovery
          </button>

        </div>

      </div>

    ))}

  </div>

</div>

);
}