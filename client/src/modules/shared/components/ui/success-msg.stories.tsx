import { Meta, StoryObj } from '@storybook/react';
import SuccessMsg from './success-msg';

const meta: Meta<typeof SuccessMsg> = {
  title: 'Components/SuccessMsg',
  component: SuccessMsg,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SuccessMsg>;

export const ExampleDefaultError: Story = {
  args: {
    message: 'Success!!!',
  },
};
