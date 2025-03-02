import React, { useState } from "react";
import useAddWorld from "./hooks/useAddWorld";

const AdminAddWorldTab: React.FC = () => {
  const [name, setName] = useState("");
  const [worldImage, setWorldImage] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const { addWorld, isLoading, error, success } = useAddWorld();

  const handleFileChange =
    (setFile: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setFile(e.target.files[0]);
      }
    };

  const handleSubmit = async () => {
    if (!name || !worldImage || !backgroundImage) {
      alert("Please fill all fields and select images.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("imgWorldUrl", worldImage);
    formData.append("imgBackgroundUrl", backgroundImage);

    await addWorld(formData);
  };

  return (
    <div className="p-3">
      <h2>Add New World</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">World added successfully!</div>
      )}

      <div className="mb-3">
        <label htmlFor="worldName" className="form-label">
          World Name
        </label>
        <input
          id="worldName"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="worldImage" className="form-label">
          World Image
        </label>
        <input
          id="worldImage"
          type="file"
          className="form-control"
          onChange={handleFileChange(setWorldImage)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="backgroundImage" className="form-label">
          Background Image
        </label>
        <input
          id="backgroundImage"
          type="file"
          className="form-control"
          onChange={handleFileChange(setBackgroundImage)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add World"}
      </button>
    </div>
  );
};

export default AdminAddWorldTab;
