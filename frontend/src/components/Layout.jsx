export default function Layout({
  children
}) {

  return (

    <div className="app">

      <aside className="sidebar">

        <div className="logo">
          RwandaLead AI
        </div>

        <nav>

          <a href="#">
            Dashboard
          </a>

          <a href="/pipeline">
              Pipeline
          </a>

          <a href="/leads">
             Leads
          </a>

          <a href="#">
            Outreach
          </a>

          <a href="#">
            Analytics
          </a>

          <a href="#">
            Settings
          </a>

        </nav>

      </aside>

      <main className="content">
        {children}
      </main>

    </div>

  );
}