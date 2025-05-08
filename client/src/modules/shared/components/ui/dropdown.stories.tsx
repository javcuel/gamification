import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const DefaultDropdown: Story = {
  args: {
    options: ['Option A', 'Option B', 'Option C'],
    placeholder: 'Choose one',
  },
};
