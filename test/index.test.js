import { shallow } from 'enzyme';

import Home from '../pages/index';
import StudentAssignmentsTable from '../pages/components/StudentAssignmentsTable';
import { getServerSideProps } from '../pages/index';

describe('Home', () => {
  it('renders a h1 header with the web app title', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Student Portal');
  });

  it('renders the StudentAssigmentTable component once', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find(StudentAssignmentsTable).length).toBe(1);
  });

  it('renders error message on error prop set to true', () => {
    const wrapper = shallow(<Home error={true} />);
    console.log(wrapper.text());
    expect(wrapper.find('p#errorMessage').length).toBe(1);
    expect(wrapper.find('p#errorMessage').text()).toBe(
      'An unexpected error occurred. Please try again later.'
    );
  });
});

describe('getServerSideProps', () => {
  it('should handle errors and communicate it to the app', async () => {
    // eslint-disable-next-line no-global-assign
    window.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      })
    );

    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          error: true,
        },
      })
    );
    window.fetch.mockReset();
  });

  it('should return studentAssigments in prop on successful response', async () => {
    // eslint-disable-next-line no-global-assign
    window.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            studentAssignments: {},
          }),
      })
    );

    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          studentAssignments: {},
        },
      })
    );
    window.fetch.mockReset();
  });
});
