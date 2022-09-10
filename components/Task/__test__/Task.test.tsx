import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Task from '../Task';
const pressAction = jest.fn();

describe("Task item component", () => {
  it("should render component with correct title", () => {
    const title = 'item 1';
    const { getAllByText } = render(<Task title={title} />);
    const component = getAllByText(title);
    expect(component).toHaveLength(1);
  }),
  it("should call press action when press task item", () => {
    const title = 'item 1';
    const { getByTestId } = render(<Task title={title} onPress={pressAction} />);
    const taskItem = getByTestId("taskPress");
    fireEvent.press(taskItem);
    expect(pressAction).toBeCalled();
  }),
  it("should call press action when press remove task item", () => {
    const title = 'item 1';
    const { getByTestId } = render(<Task title={title} onPressRemove={pressAction} />);
    const taskRemoveItem = getByTestId("removePress");
    fireEvent.press(taskRemoveItem);
    expect(pressAction).toBeCalled();
  })
})