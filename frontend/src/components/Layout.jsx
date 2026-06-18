import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  KanbanSquare, 
  Mail, 
  BarChart3, 
  Settings, 
  Sparkles,
  Compass
} from "lucide-react";
import "./Layout.css";

export default function Layout({ children }) {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard
    },
    {
      name: "Campaigns",
      path: "/campaigns",
      icon: Target
    },
    {
      name: "Leads",
      path: "/leads",
      icon: Users
    },
    {
      name: "Pipeline",
      path: "/pipeline",
      icon: KanbanSquare
    },
    {
      name: "Outreach",
      path: "/outreach",
      icon: Mail
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo">
            <div className="logo-icon">
              <Compass size={20} />
            </div>
            <div>
              <div className="logo-title">RwandaLead</div>
              <div className="logo-subtitle">AI Growth Engine</div>
            </div>
          </div>
        </div>

        <nav className="nav-menu">
          {menu.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? "nav-item active" : "nav-item"}
              >
                <IconComponent size={18} className="nav-icon" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-header">
              <Sparkles size={16} className="upgrade-spark-icon" />
              <div className="upgrade-title">Growth Plan</div>
            </div>
            <p>
              Unlock unlimited discovery and automated B2B AI outreach.
            </p>
            <button className="upgrade-btn">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
}