import { useEffect, useState } from "react";

import {
  getLeads,
  updateLeadStage
} from "../services/lead";

import Layout from "../components/Layout";

export default function Pipeline() {

  const [leads, setLeads] =
    useState([]);

  const loadLeads = async () => {

    const data =
      await getLeads();

    setLeads(data);

  };

  useEffect(() => {
    loadLeads();
  }, []);

  const moveLead = async (
    leadId,
    stage
  ) => {

    await updateLeadStage(
      leadId,
      stage
    );

    loadLeads();
  };

  const stages = [
    "NEW",
    "CONTACTED",
    "PROPOSAL",
    "WON",
    "LOST"
  ];

  return (

    <Layout>

      <h1>
        Sales Pipeline
      </h1>

      <div className="metrics">

  <div className="metric-card">

    <div>
      New Leads
    </div>

    <div className="metric-value">

      {
        leads.filter(
          l =>
          l.pipeline_stage === "NEW"
        ).length
      }

    </div>

  </div>

  <div className="metric-card">

    <div>
      Contacted
    </div>

    <div className="metric-value">

      {
        leads.filter(
          l =>
          l.pipeline_stage === "CONTACTED"
        ).length
      }

    </div>

  </div>

  <div className="metric-card">

    <div>
      Proposals
    </div>

    <div className="metric-value">

      {
        leads.filter(
          l =>
          l.pipeline_stage === "PROPOSAL"
        ).length
      }

    </div>

  </div>

  <div className="metric-card">

    <div>
      Won
    </div>

    <div className="metric-value">

      {
        leads.filter(
          l =>
          l.pipeline_stage === "WON"
        ).length
      }

    </div>

  </div>

</div>

      <div className="kanban">

        {stages.map(stage => (

          <div
            key={stage}
            className="kanban-column"
          >

            <h3>
              {stage}
            </h3>

            {

              leads
                .filter(
                  lead =>
                  lead.pipeline_stage === stage
                )
                .map(
                  lead => (

                    <div
                      key={lead.id}
                      className="lead-card"
                    >

                      <strong>
                        {lead.business_name}
                      </strong>

                      <p>
                        {lead.city}
                      </p>

                      <p>
                        Score:
                        {" "}
                        {lead.opportunity_score}
                      </p>

                      <select
                        value={
                          lead.pipeline_stage
                        }
                        onChange={(e)=>
                          moveLead(
                            lead.id,
                            e.target.value
                          )
                        }
                      >

                        {stages.map(s => (

                          <option
                            key={s}
                          >
                            {s}
                          </option>

                        ))}

                      </select>

                    </div>

                  )
                )

            }

          </div>

        ))}

      </div>

    </Layout>

  );

}