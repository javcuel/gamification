import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LinkItem from './link-item';
import { MemoryRouter } from 'react-router-dom';
import { fn } from '@storybook/test';

const meta: Meta<typeof LinkItem> = {
	title: 'Components/LinkItem',
	component: LinkItem,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<MemoryRouter>
				<ul style={{ listStyle: 'none', padding: 0 }}>
					<Story />
				</ul>
			</MemoryRouter>
		)
	]
};

export default meta;
type Story = StoryObj<typeof LinkItem>;

export const AsLink: Story = {
	args: {
		label: 'Go to Home',
		to: '/'
	}
};

export const AsButton: Story = {
	args: {
		label: 'Log out',
		onClick: fn(() => alert('Logging out...'))
	}
};
