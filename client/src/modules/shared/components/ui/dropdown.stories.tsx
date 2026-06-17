import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';

const meta: Meta<typeof Dropdown> = {
	title: 'Components/Dropdown',
	component: Dropdown,
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const DefaultDropdown: Story = {
	args: {
		options: ['Option A', 'Option B', 'Option C'],
		placeholder: 'Choose one'
	}
};

export const ManyOptions: Story = {
	args: {
		options: Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`),
		placeholder: 'Select an option'
	}
};

export const LongTextOptions: Story = {
	args: {
		options: [
			'Option with an extremely long label that might overflow or wrap depending on the layout',
			'Another very verbose option just to test how text wrapping behaves in this dropdown component',
			'Short'
		],
		placeholder: 'Select something descriptive'
	}
};

export const ManyAndLongOptions: Story = {
	args: {
		options: Array.from(
			{ length: 30 },
			(_, i) =>
				`Option ${i + 1}: This is an example of a dropdown item with a very long label to test layout responsiveness`
		),
		placeholder: 'Select something'
	}
};
