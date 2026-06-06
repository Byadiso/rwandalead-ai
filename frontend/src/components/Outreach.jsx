import {
  useEffect,
  useState
} from "react";

import {
  generateOutreach
} from "../services/outreach";

export default function OutreachGenerator({
  leadId
}) {

  const [
    outreach,
    setOutreach
  ] = useState(null);

  useEffect(() => {

    if (!leadId) return;

    loadOutreach();

  }, [leadId]);

  const loadOutreach =
    async () => {

      const data =
        await generateOutreach(
          leadId
        );

      setOutreach(data);

    };

  if (!leadId) {
    return null;
  }

  if (!outreach) {
    return (
      <div className="section">
        Loading outreach...
      </div>
    );
  }

  return (

    <div className="section">

      <h2>
        Outreach Generator
      </h2>

      <h3>
        Cold Email
      </h3>
<OutreachGenerator
  leadId={selectedLead}
/>
      <textarea
        rows="10"
        value={outreach.email}
        readOnly
        style={{
          width:"100%"
        }}
      />

      <br /><br />

      <h3>
        WhatsApp Message
      </h3>
<button
  onClick={() =>
    navigator.clipboard.writeText(
      outreach.whatsapp
    )
  }
>
  Copy Whatsapp
</button>
      <textarea
        rows="6"
        value={outreach.whatsapp}
        readOnly
        style={{
          width:"100%"
        }}
      />

      <br /><br />

      <h3>
        Proposal Summary
      </h3>

<button
  onClick={() =>
    navigator.clipboard.writeText(
      outreach.proposal
    )
  }
>
  Copy Proposal
</button>
      <textarea
        rows="10"
        value={outreach.proposal}
        readOnly
        style={{
          width:"100%"
        }}
      />

    </div>

  );
}