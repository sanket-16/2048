function canMove(cells) {
	return cells.some((group) => {
		return group.some((cell, index) => {
			if (index === 0) return false;
			if (cell.tile == null) return false;
			const moveToCell = group[index - 1];
			return moveToCell.canAccept(cell.tile);
		});
	});
}

export function canMoveUp(cells) {
	return canMove(cells);
}
export function canMoveDown(cells) {
	return canMove(cells);
}
export function canMoveLeft(cells) {
	return canMove(cells);
}
export function canMoveRight(cells) {
	return canMove(cells);
}
