import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { useAuth } from '../context/AuthContext';

const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return handleLogout;
};

export default useLogout;
