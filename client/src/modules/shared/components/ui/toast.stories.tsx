import { Meta, StoryObj } from '@storybook/react';
import Toast from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const DefaultToast: Story = {
  args: {
    message: "I'm Toasted",
  },
};

export const ErrorToast: Story = {
  args: {
    type: 'error',
    message: 'Error :(',
  },
};

export const SuccessToast: Story = {
  args: {
    type: 'success',
    message: 'Success :)',
  },
};
