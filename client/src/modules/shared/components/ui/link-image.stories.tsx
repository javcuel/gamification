import type { Meta, StoryObj } from '@storybook/react';
import LinkImage from './link-image';

const meta: Meta<typeof LinkImage> = {
	title: 'Components/LinkImage',
	component: LinkImage,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LinkImage>;

export const DefaultLinkImage: Story = {
	args: {
		src: 'images/uva.png',
		alt: 'UVa Image',
		url: 'https://www.uva.es'
	}
};

export const SmallImage: Story = {
	args: {
		src: 'images/inf.png',
		alt: 'Small Inf Image',
		url: 'https://www.inf.uva.es',
		width: 100,
		height: 100
	}
};

export const CustomAspectRatioImage: Story = {
	args: {
		src: 'images/Greidi1.png',
		alt: 'Large Greidi Image',
		url: 'https://www.greidi.infor.uva.es',
		width: 600,
		height: 400
	}
};
