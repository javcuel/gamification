import React, { useState } from "react";
import useAddUser from "./hooks/useAddUser";

/**
 * AdminAddUserTab Component
 * @component
 * Renders a form to add a new user with fields for name, password, role, and group.
 */
const AdminAddUserTab: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("U");
  const [group, setGroup] = useState("");
  const { addUser, loading, error, success } = useAddUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser({ name, password, role, group });
  };

  return (
    <div className="container mt-5">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="U">User</option>
            <option value="P">Tester</option>
            <option value="D">Developer</option>
            <option value="A">Administrator</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="group" className="form-label">
            Group
          </label>
          <input
            type="text"
            id="group"
            className="form-control"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add User"}
        </button>
        {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">User added successfully!</div>
        )}
      </form>
    </div>
  );
};

export default AdminAddUserTab;
