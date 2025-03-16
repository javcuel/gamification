import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePasswdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswd(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(user, passwd);
    if (result.success && result.userType) {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="custom-flex-center">
      <div className="d-flex flex-column align-items-center">
        <div className="mb-3">
          <Input
            placeholder="User"
            type="text"
            value={user}
            onChange={handleUserChange}
          />
        </div>

        <div className="mb-3">
          <Input
            placeholder="Password"
            type="password"
            value={passwd}
            onChange={handlePasswdChange}
          />
        </div>
        {error && <div className="alert custom-alert">{error}</div>}
        <Button text="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
