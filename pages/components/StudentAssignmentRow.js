import PropTypes from 'prop-types';
import { LocalDate } from '@js-joda/core';

function StudentAssignmentRow({ studentAssignment }) {
  const { submitted, grade, assignment } = studentAssignment;

  const passed = grade && grade >= 80;
  const dueDatePlus30 = LocalDate.parse(assignment.dueDate).plusDays(30);
  let submitButton = '';
  if (
    LocalDate.now().compareTo(dueDatePlus30) <= 0 &&
    (!submitted || !passed)
  ) {
    submitButton = (
      <input
        type="button"
        value={submitted && !passed ? 'Resubmit' : 'Submit'}
      />
    );
  }

  return (
    <tr>
      <td>{assignment.title}</td>
      <td style={{ textAlign: 'center' }}>{assignment.dueDate}</td>
      <td style={{ textAlign: 'center' }}>{submitted ? 'Yes' : 'No'}</td>
      <td style={{ textAlign: 'center' }}>{grade}</td>
      <td name="passed" style={{ textAlign: 'center' }}>
        {passed ? 'Yes' : !grade && grade !== 0 ? '' : 'No'}
      </td>
      <td style={{ textAlign: 'center' }}>{submitButton}</td>
    </tr>
  );
}

StudentAssignmentRow.propTypes = {
  studentAssignment: PropTypes.object.isRequired,
};

export default StudentAssignmentRow;
