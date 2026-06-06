import {
  useEffect,
  useState
} from "react";

import {
  getLeads,
  updateLeadStage
} from "../services/lead";

import OutreachGenerator
from "../components/Outreach";

import LeadAnalysis
from "../components/LeadAnalysis";

export default function Leads() {

  const [leads, setLeads] = useState([]);
  const [search, setSearch] =useState("");
  const [selectedLead,setSelectedLead] = useState(null);

  const loadLeads =
    async () => {

      const data =
        await getLeads();

      setLeads(data);
    };

  useEffect(() => {
    loadLeads();
  }, []);

  const changeStage =
    async (
      leadId,
      stage
    ) => {

      await updateLeadStage(
        leadId,
        stage
      );

      loadLeads();
    };

  const filtered =
    leads.filter(
      lead =>
        lead.business_name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="section">

      <h2>
        Leads Workspace
      </h2>

      <input
        placeholder="Search leads..."
        value={search}
        onChange={(e)=>
          setSearch(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <table width="100%">

        <thead>

          <tr 
            key={lead.id}
            onClick={() =>setSelectedLead(lead.id)}
           >

            <th>
              Business
            </th>

            <th>
              Priority
            </th>

            <th>
              Score
            </th>

            <th>
              Gap
            </th>

            <th>
              Stage
            </th>

          </tr>

        </thead>

        <tbody>

          {filtered.map(
            lead => (

            <tr
              key={lead.id}
            >

              <td>
                {lead.business_name}
              </td>

              <td>
                {lead.priority}
              </td>

              <td>
                {lead.opportunity_score}
              </td>

              <td>
                {lead.service_gap}
              </td>

              <td>

                <select
                  value={
                    lead.pipeline_stage
                  }
                  onChange={(e)=>
                    changeStage(
                      lead.id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    NEW
                  </option>

                  <option>
                    CONTACTED
                  </option>

                  <option>
                    PROPOSAL
                  </option>

                  <option>
                    WON
                  </option>

                  <option>
                    LOST
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <LeadAnalysis
            leadId={selectedLead}
        />

        <OutreachGenerator
            leadId={selectedLead}
        />

    </div>

  );
}