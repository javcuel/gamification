import { Meta, StoryObj } from '@storybook/react';
import WavesText from './waves-text';

const meta: Meta<typeof WavesText> = {
	title: 'Components/WavesText',
	component: WavesText,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof WavesText>;

export const DefaultWavesText: Story = {
	args: {
		text: 'Waaaavinnnnngggg!'
	}
};
