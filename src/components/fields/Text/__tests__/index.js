import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Text from '../Text';

describe('src/components/fields/Text', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Text />);
    Text.defaultProps.onClickIcon();
    expect(tree).toMatchSnapshot();
  });

  test('error', () => {
    const meta = { active: true, error: 'err', dirty: false, touched: true };

    const result = Text({ ...Text.defaultProps, meta });
    expect(result.props.children[3].props.children).toBe('err');
  });

  test('required', () => {
    const inputProps = { required: true };

    const result = Text({ ...Text.defaultProps, inputProps });
    expect(result.props.children[0].props.children[1].props.children).toBe('*');
  });

  test('with icon', () => {
    const inputProps = { icon: 'test' };

    const result = Text({ ...Text.defaultProps, inputProps });
    expect(result.props.children[2].props.icon).toBe(inputProps.icon);
  });
});
