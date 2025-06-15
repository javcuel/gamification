import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './button';

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SimpleText: Story = {
	args: {
		text: 'Click me!',
		onClick: fn(() => alert('Click!'))
	}
};

export const Visible: Story = {
	args: {
		type: 'visible',
		onClick: fn(() => alert('Visible'))
	}
};

export const Hidden: Story = {
	args: {
		type: 'hidden',
		onClick: fn(() => alert('Hidden'))
	}
};

export const Lock: Story = {
	args: {
		type: 'lock',
		onClick: fn(() => alert('Lock'))
	}
};

export const Unlock: Story = {
	args: {
		type: 'unlock',
		onClick: fn(() => alert('Unlock'))
	}
};

export const Edit: Story = {
	args: {
		type: 'edit',
		onClick: fn(() => alert('Edit'))
	}
};

export const Delete: Story = {
	args: {
		type: 'delete',
		onClick: fn(() => alert('Delete'))
	}
};

export const Disabled: Story = {
	args: {
		text: 'Disabled',
		disabled: true,
		onClick: fn(() => alert('Disabled'))
	}
};
