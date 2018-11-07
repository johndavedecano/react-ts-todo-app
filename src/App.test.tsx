import * as React from 'react';
import { shallow } from 'enzyme';

describe('sample component', () => {
  it('renders', () => {
    const wrapper = shallow(
      <div>
        <h1>Hello, Enzyme!</h1>
      </div>
    );

    expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/);
  });
});
