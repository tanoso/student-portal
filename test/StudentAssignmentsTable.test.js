import { shallow } from 'enzyme';
import { LocalDate } from '@js-joda/core';

import { buildStudentAssignment } from './test-utils';
import StudentAssignmentsTable from '../pages/components/StudentAssignmentsTable';
import StudentAssignmentRow from '../pages/components/StudentAssignmentRow';

describe('StudentAssignmentsTable', () => {
  const studentAssignments = [
    buildStudentAssignment({}),
    buildStudentAssignment({}),
  ];

  it('shows message if there is no assignment information', () => {
    const wrapper = shallow(
      <StudentAssignmentsTable studentAssignments={[]} />
    );
    expect(wrapper.text()).toBe('No assignment information available.');
  });

  it('renders one h2 element and one table when 1 or more assignments passed', () => {
    const wrapper = shallow(
      <StudentAssignmentsTable studentAssignments={studentAssignments} />
    );

    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('table').length).toBe(1);
  });

  it('displays one StudentAssignmentRow for every assignment', () => {
    const wrapper = shallow(
      <StudentAssignmentsTable studentAssignments={studentAssignments} />
    );

    expect(wrapper.find(StudentAssignmentRow).length).toBe(
      studentAssignments.length
    );
  });
});
