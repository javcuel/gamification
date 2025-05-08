// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SimpleText: Story = {
  args: {
    text: 'Click me!',
    onClick: () => alert('Hello World!'),
  },
};
