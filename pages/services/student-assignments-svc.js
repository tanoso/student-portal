import { LocalDate } from '@js-joda/core';

// Seed Data
const studentAssignments = [
  {
    id: 'ebba35a85916405c92cc323c930aaadd',
    submitted: true,
    grade: 85,
    student: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: '5f365dfaf0e84eab9b1dd9f937ab395c',
      title: 'Submitted and Passed',
      dueDate: LocalDate.now().minusWeeks(1).toString(),
    },
  },
  {
    id: '244822443a8142e992a5d7fdf2dcec65',
    submitted: true,
    grade: 79,
    studentId: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: 'e373ee1aff1f402e8a1ef28e0f6b6030',
      title: 'Failed, after due but within 30 days',
      dueDate: LocalDate.now().minusDays(30).toString(),
    },
  },
  {
    id: '869cf915201a4571a469c7432edbe910',
    submitted: true,
    grade: 53,
    studentId: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: 'e373ee1aff1f402e8a1ef28e0f6b6030',
      title: 'Failed, 31+ days after due',
      dueDate: LocalDate.now().minusDays(32).toString(),
    },
  },
  {
    id: '89a87a5dfa0f46f0a937494ef86df187',
    submitted: false,
    student: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: 'a68ff4deb4ac4cad9fda8a8c53bc5159',
      title: 'Not submitted & before due date',
      dueDate: LocalDate.now().plusWeeks(1).plusDays(3).toString(),
    },
  },
  {
    id: 'e709fccee5b1412496272be03e33b223',
    submitted: false,
    student: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: 'a68ff4deb4ac4cad9fda8a8c53bc5159',
      title: 'Not submitted, after due, within 30 days',
      dueDate: LocalDate.now().minusWeeks(2).plusDays(3).toString(),
    },
  },
  {
    id: 'b08471bf6201416e889480ed35b6ce37',
    submitted: false,
    student: {
      id: 'f8fa0b09cb1847bc8f3a6c2450b2c05c',
      name: 'Tana',
    },
    assignment: {
      id: 'a68ff4deb4ac4cad9fda8a8c53bc5159',
      title: 'Not submitted, 31+ days after due',
      dueDate: LocalDate.now().minusWeeks(5).plusDays(3).toString(),
    },
  },
];

// eslint-disable-next-line no-unused-vars
export default {
  findAll(studentId) {
    // Not using the student id. Returning all the assignments (which belong to
    // the same student).
    return Promise.resolve(studentAssignments);
  },
};
