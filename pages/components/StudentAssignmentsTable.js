import PropTypes from 'prop-types';
import StudentAssignmentRow from './StudentAssignmentRow';

function StudentAssignmentsTable({ studentAssignments = [] }) {
  if (studentAssignments.length === 0)
    return <p style={{ textAlign: 'center' }}>No assignment information available.</p>;

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Assignments</h2>
      <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Title</th>
            <th>Due Date</th>
            <th>Submitted</th>
            <th>Grade</th>
            <th>Passed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentAssignments.map((studentAssignment) => (
            <StudentAssignmentRow
              key={studentAssignment.id}
              studentAssignment={studentAssignment}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

StudentAssignmentsTable.propTypes = {
  studentAssignments: PropTypes.arrayOf(PropTypes.object),
};

export default StudentAssignmentsTable;
