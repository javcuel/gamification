import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { User } from '../../../api/user';
import './styles/UserManagementItem.css';

interface UserManagementItemProps {
  user: User;
  onDelete: (userId: number) => void;
}

/**
 * UserManagementItem Component
 * Represents a single user in the list.
 */
const UserManagementItem: React.FC<UserManagementItemProps> = ({
  user,
  onDelete,
}) => {
  return (
    <li className="user-management-item">
      <div>
        <strong>{user.name}</strong> - {user.role}
      </div>
      <div className="d-flex ">
        <button className="user-management-item-button">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button
          className="user-management-item-button"
          onClick={() => onDelete(user.id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </li>
  );
};

export default UserManagementItem;
