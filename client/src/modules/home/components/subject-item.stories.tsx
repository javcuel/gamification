import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SubjectItem from './subject-item';
import { MemoryRouter } from 'react-router-dom';
import { Subject } from '../../shared/api/domain/subject';

const mockSubject: Subject = {
	id: 1,
	name: 'Programming',
	img: '/images/default_subject_image.png',
	imgBackground: '/images/default_subject_image.png',
	position: 1,
	isOpen: true,
	isVisible: true
};

const meta: Meta<typeof SubjectItem> = {
	title: 'Components/SubjectItem',
	component: SubjectItem,
	decorators: [
		Story => (
			<MemoryRouter>
				<div style={{ maxWidth: 200 }}>
					<Story />
				</div>
			</MemoryRouter>
		)
	],
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SubjectItem>;

export const OpenAndVisible: Story = {
	args: {
		subject: mockSubject
	}
};

export const ClosedSubject: Story = {
	args: {
		subject: {
			...mockSubject,
			isOpen: false
		}
	}
};

export const InvisibleSubject: Story = {
	args: {
		subject: {
			...mockSubject,
			isVisible: false
		}
	}
};
