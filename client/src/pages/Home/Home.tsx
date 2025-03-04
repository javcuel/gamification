import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';
import useUserInfo from '../../hooks/useUserInfo';
import SubjectGrid from './components/SubjectGrid';

const Home: React.FC = () => {
  const { name, type, totalScore, completedSubjects } = useUserInfo();
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />

      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100vh' }}
      >
        <div style={{ height: '5vh' }}>
          <NavBar
            userName={name}
            userType={type}
            userTotalScore={totalScore}
            userCompletedSubjects={completedSubjects}
          />
        </div>

        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <SubjectGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
