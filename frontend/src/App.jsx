import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";

import Campaigns from "./pages/Campaigns";
import Outreach from "./components/Outreach";



import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
            path="/leads"
            element={<Leads />}
        />

        <Route
            path="/pipeline"
            element={<Pipeline />}
        />

        <Route
            path="/campaigns"
            element={<Campaigns />}
        />

        <Route
            path="/outreach"
            element={<Outreach />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;