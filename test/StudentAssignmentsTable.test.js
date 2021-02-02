import { shallow } from 'enzyme';
import { LocalDate } from '@js-joda/core';

import StudentAssignmentsTable from '../pages/components/StudentAssignmentsTable';
import StudentAssignmentRow from '../pages/components/StudentAssignmentRow';

describe('StudentAssignmentsTable', () => {
  const today = LocalDate.now();
  const studentAssignments = [
    {
      id: 1,
      submitted: true,
      grade: 85,
      assignment: {
        id: 1,
        title: 'Arrays',
        dueDate: today.minusWeeks(1).toString(),
      },
    },
    {
      id: 2,
      submitted: true,
      grade: 79,
      assignment: {
        id: 2,
        title: 'Linked Lists',
        dueDate: today.minusDays(30).toString(),
      },
    },
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
