import { Meta, StoryObj } from '@storybook/react';
import FloatingText from './floating-text';

const meta: Meta<typeof FloatingText> = {
  title: 'Components/FloatingText',
  component: FloatingText,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FloatingText>;

export const DefaultFloatingText: Story = {
  args: {
    text: 'Floating!',
  },
};
