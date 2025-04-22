import React, { useState } from 'react';
import { UserApiPayload } from '../../../../api/user';
import { ROLES } from '../../../../constants/roles';
import Button from '../../../shared/components/ui/Button';
import Dropdown from '../../../shared/components/ui/Dropdown';
import Input from '../../../shared/components/ui/Input';
import '../styles/EditModal.css';

interface UserEditModalProps {
  data: UserApiPayload;
  onClose: () => void;
  onSave: (data: {
    name: string;
    passwd: string;
    role: string;
    group: string;
  }) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  data,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(data.name);
  const [passwd, setPasswd] = useState(data.passwd);
  const [role, setRole] = useState(data.role);
  const [group, setGroup] = useState(data.group);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, passwd, role, group });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-center mb-3">Edit User</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Passwd"
            type="password"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />

          <Dropdown
            options={Object.keys(ROLES)}
            placeholder="Role"
            onChange={(value) => setRole(value)}
          />

          <Input
            placeholder="Group"
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <div className="d-flex justify-content-between mt-3">
            <Button text="Cancel" onClick={onClose} />
            <Button text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
