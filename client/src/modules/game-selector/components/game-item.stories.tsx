import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GameItem from './game-item';
import { MemoryRouter } from 'react-router-dom';
import { Game } from '../../shared/api/domain/game';

const mockGame: Game = {
	id: 1,
	idSubject: 1,
	img: '/images/default_game_image.png',
	name: 'MarsMinner',
	maxScore: 8000,
	isOpen: true,
	isVisible: true,
	position: 1,
	idUser: 1,
	isNew: true,
	uploaded: true
};

const meta: Meta<typeof GameItem> = {
	title: 'Components/GameItem',
	component: GameItem,
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

type Story = StoryObj<typeof GameItem>;

export const OpenAndVisible: Story = {
	args: {
		game: mockGame
	}
};

export const ClosedGame: Story = {
	args: {
		game: {
			...mockGame,
			isOpen: false
		}
	}
};

export const InvisibleGame: Story = {
	args: {
		game: {
			...mockGame,
			isVisible: false
		}
	}
};
