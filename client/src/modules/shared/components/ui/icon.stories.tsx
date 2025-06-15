import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const DefaultIcon: Story = {
	args: {
		img: '/images/default_icon_image.png',
		alt: 'Sample Default size icon'
	}
};

export const MediumIcon: Story = {
	args: {
		img: '/images/default_icon_image.png',
		alt: 'Sample Medium size icon',
		size: 100
	}
};

export const BigIcon: Story = {
	args: {
		img: '/images/default_icon_image.png',
		alt: 'Sample Big size icon',
		size: 200
	}
};
