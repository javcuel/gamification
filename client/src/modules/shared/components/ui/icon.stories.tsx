import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    size: 48,
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const DefaultIcon: Story = {
  args: {
    img: '/images/default_icon_image.png',
    alt: 'Sample icon',
  },
};
