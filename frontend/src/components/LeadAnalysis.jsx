import {
  useEffect,
  useState
} from "react";

import {
  getAnalysis
} from "../services/analysis";

export default function LeadAnalysis({
  leadId
}) {

  const [
    analysis,
    setAnalysis
  ] = useState(null);

  useEffect(() => {

    if (!leadId) return;

    loadAnalysis();

  }, [leadId]);

  const loadAnalysis =
    async () => {

      const data =
        await getAnalysis(
          leadId
        );

      setAnalysis(data);

    };

  if (!analysis) {
    return null;
  }

  return (

    <div className="section">

      <h2>
        Opportunity Analysis
      </h2>

      <p>

        <strong>
          Score:
        </strong>

        {" "}

        {analysis.opportunity_score}

      </p>

      <h3>
        Problems
      </h3>

      <ul>

        {
          analysis.problems.map(
            p => (
              <li key={p}>
                {p}
              </li>
            )
          )
        }

      </ul>

      <h3>
        Services
      </h3>

      <ul>

        {
          analysis.services.map(
            s => (
              <li key={s}>
                {s}
              </li>
            )
          )
        }

      </ul>

      <h3>
        Deal Size
      </h3>

      <p>
        {analysis.estimated_value}
      </p>

    </div>

  );

}