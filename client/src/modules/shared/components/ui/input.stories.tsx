import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Input from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

const ControlledTemplate = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange?.(e); // Optional: call original onChange if passed
      }}
    />
  );
};

export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
    value: '',
  },
  render: ControlledTemplate,
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    value: '',
  },
  render: ControlledTemplate,
};
