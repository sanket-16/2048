function slideTiles(cells) {
	return Promise.all(
		cells.flatMap((group) => {
			const promises = [];
			for (let i = 1; i < group.length; i++) {
				const cell = group[i];
				if (cell.tile == null) continue;
				let lastValidCell;
				for (let j = i - 1; j >= 0; j--) {
					const moveTocell = group[j];
					if (!moveTocell.canAccept(cell.tile)) break;
					lastValidCell = moveTocell;
				}
				if (lastValidCell != null) {
					promises.push(cell.tile.waitForTransition);
					if (lastValidCell.tile != null) {
						lastValidCell.mergeTile = cell.tile;
					} else {
						lastValidCell.tile = cell.tile;
					}
					cell.tile = null;
				}
			}
			return promises;
		})
	);
}


export function moveUp(grid) {
	slideTiles(grid);
}
export function moveDown(grid) {
	slideTiles(grid);
}
export function moveLeft(grid) {
	slideTiles(grid);
}
export function moveRight(grid) {
	slideTiles(grid);
}
