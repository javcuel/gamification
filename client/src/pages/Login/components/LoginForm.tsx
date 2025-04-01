import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../shared/ui/Button';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import Input from '../../shared/ui/Input';

/**
 * A login form component that allows users to input their username and password.
 * On successful login, the user is redirected to the home page.
 * It uses `useAuth` to manage the authentication state and handle login logic.
 *
 * @component
 * @example
 * // Example usage:
 * <LoginForm />
 *
 * @returns {JSX.Element} A form element containing input fields for the username and password,
 * and a login button.
 */
const LoginForm: React.FC = () => {
  const [user, setUser] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');

  const { loginRequest, error } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles changes to the username input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  /**
   * Handles changes to the password input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handlePasswdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswd(e.target.value);
  };

  /**
   * Handles form submission for logging in.
   * It prevents the default form submission, attempts to log in the user,
   * and navigates to the home page on successful login.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await loginRequest(user, passwd);
    if (result.success && result.role) {
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
        <div className="mb-3">
          <Button text="Login" />
        </div>
        {error && <ErrorMsg message={error}></ErrorMsg>}
      </div>
    </form>
  );
};

export default LoginForm;
