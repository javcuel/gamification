import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { User } from '../../../api/user';
import './styles/user-management-item.css';

interface UserManagementItemProps {
  user: User;
  onDelete: (userId: number) => void;
}

/*  {

const [showEdit, setShowEdit] = useState(false);


   showEdit && (
     <UserEditModal
       data={{
         name: 'John Doe',
         passwd: 'xsdasd',
         role: 'TEACHER',
         group: 'A1',
       }}
       onClose={() => setShowEdit(false)}
       onSave={(data) => {
         console.log('Saved user:', data);
         setShowEdit(false);
       }}
     />
   );
 } 
    <Button text="Editar" onClick={() => setShowEdit(true)} />  
 */

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
