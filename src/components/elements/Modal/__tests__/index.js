import React, { useContext, useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Modal, { Content } from '../Modal';

const setModal = jest.fn();
const setOnCloseModal = jest.fn();
useContext.mockImplementation(() => ({ setModal, setOnCloseModal }));

describe('src/components/elements/Modal', () => {
  test('render', () => {
    useEffect.mockImplementationOnce(f => f()());

    Modal(Modal.defaultProps);
    Modal.defaultProps.onClose();
    expect(setModal).toHaveBeenCalledWith(null);

    const onClose = jest.fn();
    Modal({ ...Modal.defaultProps, onClose, open: true });
    expect(setModal).toHaveBeenCalledWith(<Content onClose={onClose} />);

  });

  test('Content', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Content />);
    expect(tree).toMatchSnapshot();
  });
});
