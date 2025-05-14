import { Meta, StoryObj } from '@storybook/react';
import LoadingMsg from './loading-msg';

const meta: Meta<typeof LoadingMsg> = {
  title: 'Components/LoadingMsg',
  component: LoadingMsg,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoadingMsg>;

export const TextLoading: Story = {
  args: {
    message: 'Loading...',
  },
};

export const EmptyLoading: Story = {
  args: {
    message: '',
  },
};
