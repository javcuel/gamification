// LinkImage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LinkImage from './link-image';

const meta: Meta<typeof LinkImage> = {
  title: 'Components/LinkImage',
  component: LinkImage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkImage>;

export const DefaultLinkImage: Story = {
  args: {
    src: 'images/uva.png',
    alt: 'UVa Image',
    url: 'https://www.uva.es',
    width: 200,
    height: 200,
  },
};
