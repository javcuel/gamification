import { Meta, StoryObj } from '@storybook/react';
import LoadingMsg from './loading-msg';

const meta: Meta<typeof LoadingMsg> = {
  title: 'Components/LoadingMsg',
  component: LoadingMsg,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoadingMsg>;

// Example Story: Default Error Message
export const ExampleDefaultError: Story = {
  args: {
    message: 'Loading...',
  },
};

// Example Story: Custom Error Message
export const ExampleCustomError: Story = {
  args: {
    message: 'Loading subjects...',
  },
};
