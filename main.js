import Grid from './src/Grid';
import Tile from './src/Tile';
import { moveUp, moveDown, moveLeft, moveRight } from './utils/slideTiles';
import {
	canMoveUp,
	canMoveDown,
	canMoveLeft,
	canMoveRight,
} from './utils/canMove';
import checkGameOver from './utils/checkGameOver';

const gameBoard = document.querySelector('.game-board');
const restart = document.querySelector('.restart');
const play = document.querySelector('.play');

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

restart.addEventListener('click', () => {
	document.location.reload();
});

play.addEventListener('click', () => {
	play.style.display = 'none';
	setupInput();
});

function setupInput() {
	window.addEventListener('keydown', handleInput, { once: true });
}

async function handleInput(e) {
	let cellsByColumn = grid.cellsByColumn;
	let cellsByRow = grid.cellsByRow;
	switch (e.key) {
		case 'ArrowUp':
			if (!canMoveUp(cellsByColumn)) {
				setupInput();
				return;
			}
			await moveUp(cellsByColumn);
			break;
		case 'ArrowDown':
			if (
				!canMoveDown(
					cellsByColumn.map((column) => [...column].reverse())
				)
			) {
				setupInput();
				return;
			}
			await moveDown(
				cellsByColumn.map((column) => [...column].reverse())
			);
			break;
		case 'ArrowRight':
			if (!canMoveRight(cellsByRow.map((row) => [...row].reverse()))) {
				setupInput();
				return;
			}
			await moveRight(cellsByRow.map((row) => [...row].reverse()));
			break;
		case 'ArrowLeft':
			if (!canMoveLeft(cellsByRow)) {
				setupInput();
				return;
			}
			await moveLeft(cellsByRow);
			break;
		default:
			setupInput();
			return;
	}
	grid.cells.forEach((cell) => cell.mergeTiles());

	const newTile = new Tile(gameBoard);
	grid.randomEmptyCell().tile = newTile;

	checkGameOver(cellsByColumn, cellsByRow, newTile, restart);

	setupInput();
}
