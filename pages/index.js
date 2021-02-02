import PropTypes from 'prop-types';
import StudentAssignmentsTable from './components/StudentAssignmentsTable';

export default function Home({ studentAssignments, error }) {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Student Portal</h1>
      {error && (
        <p id="errorMessage" style={{ color: 'red', textAlign: 'center' }}>
          An unexpected error occurred. Please try again later.
        </p>
      )}
      <StudentAssignmentsTable studentAssignments={studentAssignments} />
    </>
  );
}

Home.propTypes = {
  studentAssignments: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
};

export async function getServerSideProps() {
  return fetch(
    'http://localhost:3000/api/student-assignments/75694983b2b44a709e6f946f4'
  )
    .then(async (res) => {
      if (res.status !== 200) return { props: { error: true } };
      return { props: await res.json() };
    })
    .catch(() => {
      return { props: { error: true } };
    });
}
