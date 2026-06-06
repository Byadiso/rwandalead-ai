import { useState } from "react";

import { registerUser } from "../services/auth";

export default function Register() {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        full_name,
        email,
        password,
      });

      alert("Account created");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Create Account</h1>

      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          value={full_name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br />
        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}