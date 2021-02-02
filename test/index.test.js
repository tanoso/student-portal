import { shallow } from 'enzyme';

import Home from '../pages/index';
import StudentAssignmentsTable from '../pages/components/StudentAssignmentsTable';

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
});