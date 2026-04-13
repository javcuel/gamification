import React from 'react';

import Toast from '../../shared/components/ui/toast';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import useSubject from '../hooks/use-home';
import SubjectItem from './subject-item';

/**
 * The SubjectGrid component renders a grid of subjects by using the `SubjectItem` component
 * for each visible subject.
 *
 * @component
 *
 * @returns {JSX.Element} A grid of subjects with visible subjects displayed as individual
 * `SubjectItem` components. If an error occurs, an alert message is shown.
 */
const SubjectGrid: React.FC = () => {
	const { subjects, error, loading } = useSubject();

	// Filtramos las asignaturas visibles antes del renderizado para saber si hay alguna
	const visibleSubjects = subjects.filter(subject => subject.isVisible);

	return (
		<div className='container'>
			{loading ? (
				<div className='row custom-flex-center text-center'>
					<LoadingMsg message='Loading Subjects...' />
				</div>
			) : (
				<div className='row custom-flex-center text-center'>
					{error && <Toast type='error' message={error} />}

					{/* Si no hay error, no está cargando y no hay asignaturas visibles, mostramos aviso */}
					{!error && visibleSubjects.length === 0 ? (
						<div className="alert alert-secondary mt-4 w-75 mx-auto opacity-75">
							<h5>No subjects available</h5>
							<p className="mb-0">You are not assigned to any subjects at the moment. Please contact your administrator or teacher.</p>
						</div>
					) : (
						/* Si hay asignaturas, hacemos el map normal */
						visibleSubjects.map((subject, index) => (
							<div className='col-auto' key={index}>
								<SubjectItem subject={subject} />
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default SubjectGrid;