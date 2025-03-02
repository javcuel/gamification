import React from 'react';
import SpaceBackground from '../../components/SpaceBackground';
import LinkImage from '../../components/ui/LinkImage';
import LoginForm from './components/LoginForm';
//TODO: Mirar si el segundo div container sirve para algo o es redundante con el de arriba
const Login: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <SpaceBackground />
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>GAMISPACE</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <LinkImage
              src="src/assets/images/imagesLogin/uva_inf_logo.png"
              alt="inf_logo"
              url="https://www.inf.uva.es"
              width={'60%'}
            />
          </div>
          <div className="col-6">
            <LoginForm />
          </div>
          <div className="col-3">
            <LinkImage
              src="src/assets/images/imagesLogin/uva_logo_color.png"
              alt="uva_logo"
              url="https://www.uva.es"
              width={'60%'}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <LinkImage
              src="src/assets/images/imagesLogin/uva_logo_color.png"
              alt="uva_logo"
              url="https://www.uva.es"
              width={'15%'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
