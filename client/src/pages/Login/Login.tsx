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
            <h1 className="mb-5">GAMISPACE</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <LinkImage
              src="images/imagesLogin/uva.png"
              alt="uva_logo"
              url="https://www.uva.es"
              width={'45%'}
            />
          </div>
          <div className="col-6">
            <LoginForm />
          </div>
          <div className="col-3">
            <LinkImage
              src="images/imagesLogin/inf.png"
              alt="inf_logo"
              url="https://www.inf.uva.es"
              width={'65%'}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col">
            <LinkImage
              src="images/imagesLogin/greidi.jpg"
              alt="greidi_logo"
              url="https://www.greidi.infor.uva.es"
              width={'10%'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
