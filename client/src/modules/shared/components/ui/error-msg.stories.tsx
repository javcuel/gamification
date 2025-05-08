import { Meta, StoryObj } from '@storybook/react';
import ErrorMsg from './error-msg';

const meta: Meta<typeof ErrorMsg> = {
  title: 'Components/ErrorMsg',
  component: ErrorMsg,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ErrorMsg>;

export const DefaultError: Story = {
  args: {
    message: 'An unexpected error occurred!',
  },
};
