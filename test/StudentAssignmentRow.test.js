import { shallow } from 'enzyme';
import { LocalDate } from '@js-joda/core';
import { random, lorem } from 'faker';

import StudentAssignmentRow from '../pages/components/StudentAssignmentRow';

const buildStudentAssignment = ({ submitted, grade, dueDate }) => {
  submitted = submitted === undefined ? random.boolean() : submitted;
  return {
    id: random.uuid(),
    submitted,
    grade: submitted ? grade || 60 + random.number(40) : undefined,
    assignment: {
      id: random.uuid(),
      title: lorem.words(random.number(5)),
      dueDate: dueDate || LocalDate.now(),
    },
  };
};

describe('StudentAssignmentsTable', () => {
  const today = LocalDate.now();
  it('fails if no studentAssignment prop passed', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => shallow(<StudentAssignmentRow />)).toThrow(TypeError);
    expect(/^Warning: Failed/.test(spy.mock.calls[0][0])).toBe(true);
    expect(/studentAssignment/.test(spy.mock.calls[0][2])).toBe(true);
    expect(/required/.test(spy.mock.calls[0][2])).toBe(true);
    spy.mockRestore();
  });

  it('shows it passed if grade >= 80', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: true,
      grade: 80,
      dueDate: today.minusDays(31).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );

    expect(wrapper.find('td[name="passed"]').text()).toBe('Yes');
  });

  it('shows it failed if grade < 80', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: true,
      grade: 79,
      dueDate: today.minusDays(31).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );

    expect(wrapper.find('td[name="passed"]').text()).toBe('No');
  });

  it('shows submit button if not submitted and within 30 days from due date', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: false,
      dueDate: today.minusDays(30).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );
    const submitBtn = wrapper.find('input[type="button"]');
    expect(submitBtn.length).toBe(1);
    expect(submitBtn.props().value).toBe('Submit');
  });

  it('does not show submit button due date older than 30 days', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: false,
      dueDate: today.minusDays(31).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );

    expect(wrapper.find('input[type="button"]').length).toBe(0);
  });

  it('shows resubmit button if failed and within 30 days from due date', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: true,
      grade: 79,
      dueDate: today.minusDays(30).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );
    const submitBtn = wrapper.find('input[type="button"]');
    expect(submitBtn.length).toBe(1);
    expect(submitBtn.props().value).toBe('Resubmit');
  });

  it('does not show resubmit button if passed and within 30 days from due date', () => {
    const studentAssignment = buildStudentAssignment({
      submitted: true,
      grade: 79,
      dueDate: today.minusDays(30).toString(),
    });

    const wrapper = shallow(
      <StudentAssignmentRow studentAssignment={studentAssignment} />
    );
    const submitBtn = wrapper.find('input[type="button"]');
    expect(submitBtn.length).toBe(1);
    expect(submitBtn.props().value).toBe('Resubmit');
  });
});
