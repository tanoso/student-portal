import { LocalDate } from '@js-joda/core';
import { random, lorem } from 'faker';

export const buildStudentAssignment = ({ submitted, grade, dueDate }) => {
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
