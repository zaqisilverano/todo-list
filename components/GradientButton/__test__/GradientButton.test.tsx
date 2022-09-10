import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GradienButton from '../GradienButton';
import { Text } from 'react-native';
const pressAction = jest.fn();

describe("Gradient button component", () => {
  it("should render component with correct text button", () => {
    const title = 'gradient button';
    const { getAllByText } = render(<GradienButton><Text>{title}</Text></GradienButton>);
    const component = getAllByText(title);
    expect(component).toHaveLength(1);
  }),
  it("should call press action when press the button", () => {
    const { getByTestId } = render(<GradienButton onPress={pressAction} />);
    const gradienButton = getByTestId("gradientButtonPress");
    fireEvent.press(gradienButton);
    expect(pressAction).toBeCalled();
  })
})