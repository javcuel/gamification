import type { Meta, StoryObj } from '@storybook/react';
import SpaceBackground from './space-background';

const meta: Meta<typeof SpaceBackground> = {
	title: 'Components/SpaceBackground',
	component: SpaceBackground,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof SpaceBackground>;

export const DefaultSpaceBackground: Story = {
	args: {}
};
