import React, { useState } from 'react';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import '../styles/AdminAddCard.css';

const AdminAddSubjectTab: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleSubmit = async () => {
    /*  e.preventDefault(); */
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '70vh' }}
    >
      <div className="card input-card" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Add Subject</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            placeholder="New Subject"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="image back"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="image subkect"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button text="Add Subject" onClick={handleSubmit} />
        </form>

        {/* {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Subject added successfully!</div>
        )} */}
      </div>
    </div>
  );
};

export default AdminAddSubjectTab;
