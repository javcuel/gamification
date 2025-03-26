import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { User } from '../../../api/user';
import './styles/user-item.css';

interface UserItemProps {
  user: User;
  onDelete: (userId: number) => void;
}

/**
 * UserItem Component
 * Represents a single user in the list.
 */
const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
  return (
    <li className="user-item">
      <div>
        <strong>{user.name}</strong> - {user.role}
      </div>
      <div className="d-flex gap-2">
        <button className="btn custom-button">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button className="btn custom-button" onClick={() => onDelete(user.id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </li>
  );
};

export default UserItem;
