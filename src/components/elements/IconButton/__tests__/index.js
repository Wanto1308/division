import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import IconButton from '../IconButton';

jest.mock('../../../../utils/unit', () => ({
  autoPx: v => v
}));

describe('src/components/elements/IconButton', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<IconButton />);
    expect(tree).toMatchSnapshot();
    IconButton.defaultProps.onClick();
  });

  test('icon', () => {
    const result = IconButton({ ...IconButton.defaultProps, icon: 'test' });
    expect(result.props.children.type).toBe('img');
  });
});
