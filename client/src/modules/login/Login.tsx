import React from 'react';

import LinkImage from '../shared/components/ui/link-image';
import WavesText from '../shared/components/ui/waves-text';
import LoginForm from './components/login-form';

/**
 * The Login component renders a login page with a space-themed background,
 * a wave effect text ("Gamispace"), and links to various external resources.
 * It includes a central login form for users to input their credentials.
 *
 * @component
 * @example
 * // Example usage:
 * <Login />
 *
 * @returns {JSX.Element} The login page containing the background, text, links, and login form.
 */
const Login: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <div className="container">
        <div className="row">
          <div className="col mb-5">
            <WavesText text="Gamispace" />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <LinkImage
              src="images/uva.png"
              alt="uva_logo"
              url="https://www.uva.es"
              width={'60%'}
            />
          </div>
          <div className="col-6">
            <LoginForm />
          </div>
          <div className="col-3">
            <LinkImage
              src="images/inf.png"
              alt="inf_logo"
              url="https://www.inf.uva.es"
              width={'60%'}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <LinkImage
              src="images/Greidi1.png"
              alt="greidi_logo"
              url="https://www.greidi.infor.uva.es"
              width={'20%'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
