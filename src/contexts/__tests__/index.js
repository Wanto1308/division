import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Context from '../index';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    fetchNotificationCount: jest.fn()
  };
});

const add = jest.fn();
const remove = jest.fn();
const scrollTo = jest.fn();
document.getElementsByTagName = () => [{
  classList: { add, remove },
  scrollTo,
}];

describe('src/contexts', () => {
  test('render', () => {
    useLocation.mockImplementationOnce(() => ({ pathname: '/' }));

    useState
      .mockImplementationOnce(v => [v, jest.fn()])
      .mockImplementationOnce(v => [v()(), jest.fn()]);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Context />);
    expect(tree).toMatchSnapshot();
  });

  test('close modal and add modal class', () => {
    const setModal = jest.fn();
    const onCloseModal = jest.fn();
    const setOnCloseModal = jest.fn();
    useState
      .mockImplementationOnce(() => ['modal', setModal])
      .mockImplementationOnce(() => [onCloseModal, setOnCloseModal]);
    const ev1 = { currentTarget: 'tes', target: 'tes' };
    const ev2 = { currentTarget: '', target: 'tes' };
    const result1 = Context(Context.defaultProps);

    result1.props.children[1].props.onClick(ev1);
    expect(onCloseModal).toHaveBeenCalled();

    result1.props.children[1].props.onClick(ev2);
    expect(add).toHaveBeenCalledWith('modal-open');
  });
});
