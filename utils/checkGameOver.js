import {
	canMoveUp,
	canMoveDown,
	canMoveLeft,
	canMoveRight,
} from './canMove';

export default function checkGameOver(
	cellsByColumn,
	cellsByRow,
	newTile,
	restart
) {
	if (
		!canMoveUp(cellsByColumn) &&
		!canMoveDown(cellsByColumn.map((column) => [...column].reverse())) &&
		!canMoveLeft(cellsByRow) &&
		!canMoveRight(cellsByRow.map((row) => [...row].reverse()))
	) {
		newTile.waitForTransition(true).then(() => {
			restart.style.display = 'flex';
		});
		return;
	}
}
