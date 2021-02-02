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
    'http://localhost:3000/api/student-assignments/f8fa0b09cb1847bc8f3a6c2450b2c05c'
  )
    .then(async (res) => {
      if (res.status !== 200) return { props: { error: true } };
      return { props: { studentAssignments: await res.json() } };
    })
    .catch(() => {
      return { props: { error: true } };
    });
}
