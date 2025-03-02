import useUserInfo from '../../hooks/useUserInfo';
import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';
import WorldGrid from './components/WorldGrid';

const Home: React.FC = () => {
  const { name, type, totalScore, completedSubjects } = useUserInfo();
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      {/* Space Background}*/}
      <SpaceBackground />

      {/* NavBar*/}
      <div className="row">
        <div className="col-12 grid-element">
          <NavBar
            userName={name}
            userType={type}
            userTotalScore={totalScore}
            userCompletedSubjects={completedSubjects}
          />
        </div>
      </div>

      {/* Carrusel*/}
      <div className="row custom-flex-center" style={{ height: '80vh' }}>
        <div className="col-12 grid-element">
          <WorldGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
