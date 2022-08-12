import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;
const next_tetromino_grid_columns = Tetris.next_tetro_field_width;
const next_tetromino_grid_rows = Tetris.next_tetro_field_height;
// console.log(grid_columns, grid_rows, next_tetromino_grid_columns, next_tetromino_grid_rows)
let game = Tetris.new_game();

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);
document.documentElement.style.setProperty("--grid-rows-next", next_tetromino_grid_rows);
document.documentElement.style.setProperty("--grid-columns-next", next_tetromino_grid_columns);

const grid = document.getElementById("grid");
const grid_next_tetro = document.getElementById("grid-next");

const el = (id) => document.getElementById(id);

el("next_tetromino").textContent = game.next_tetromino;

const range = (n) => Array.from({
	"length": n
}, (ignore, k) => k);
const cells = range(grid_rows).map(function() {
	const row = document.createElement("div");
	row.className = "row";
	const rows = range(grid_columns).map(function() {
		const cell = document.createElement("div");
		cell.className = "cell";

		row.append(cell);

		return cell;
	});

	grid.append(row);
	return rows;
});

/**next tetromino*/
const nextDiv = document.getElementById("next");
// const next = range(5).map(function() {
// 	const row = document.createElement("div");
// 	row.className = "row";
// 	const rows = range(6).map(function() {
// 		const cell = document.createElement("div");
// 		cell.className = "cell";

// 		row.append(cell);

// 		return cell;
// 	});

// 	nextDiv.append(row);
// 	return rows;
// });

const update_grid_next = function() {
	// next.forEach(function(line, line_index) {
	// 	line.forEach(function(block, column_index) {
	// 		const next_cell = next[line_index][column_index];
	// 		next_cell.className = `cell`;
	// 	});
	// });
	nextDiv.innerHTML = "";
	game.next_tetromino.grid.forEach(function(line, line_index) {
		const row = document.createElement("div");
		row.className = `row`;
		row.style = `--w:${line.length}`
		line.forEach(function(block, column_index) {
			const cell = document.createElement("div");
			cell.className = `cell ${block}`;
			row.append(cell);
		});
		nextDiv.append(row);
	});
};
//===============================//


/**hold implementation*/
const holdDiv = document.getElementById("hold");
const update_grid_hold = function() {
	holdDiv.innerHTML = "";
	if(game.held_tetromino){
		game.held_tetromino.grid.forEach(function(line, line_index) {
			const row = document.createElement("div");
			row.className = `row`;
			row.style = `--w:${line.length}`
			line.forEach(function(block, column_index) {
				const cell = document.createElement("div");
				cell.className = `cell ${block}`;
				row.append(cell);
			});
			holdDiv.append(row);
		});
	}
};
//===============================//

const next_tetro_cells = range(next_tetromino_grid_rows).map(function() {
	const next_tetro_row = document.createElement("div");
	next_tetro_row.className = "next_tetro_row";

	const next_tetro_rows = range(next_tetromino_grid_columns).map(function() {
		const next_tetro_cell = document.createElement("div");
		next_tetro_cell.className = "next_tetro_cell";

		next_tetro_row.append(next_tetro_cell);

		return next_tetro_cell;
	});

	grid_next_tetro.append(next_tetro_row);
	return next_tetro_rows;
});
const update_grid = function() {
	
	game.field.forEach(function(line, line_index) {
		line.forEach(function(block, column_index) {
			const cell = cells[line_index][column_index];
			cell.className = `cell ${block}`;
			// console.log(cell.className)
		});
	});
	Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
		function(coord) {
			try {
				const cell = cells[coord[1]][coord[0]];
				cell.className = (
					`cell current ${game.current_tetromino.block_type}`
				);
				// console.log(cell.className)
			} catch (ignore) {

			}
		}
	);
};
const update_grid_next_tetro = function() {
	game.field.forEach(function(line, line_index) {
		line.forEach(function(block, column_index) {
			const next_tetro_cell = next_tetro_cells[line_index][column_index];
			next_tetro_cell.className = `next_tetro_cell ${block}`;
		});
	});

	Tetris.tetromino_coordiates_next_tetro(game.next_tetromino, game.position).forEach(
		function(coord_next) {
			try {
				const next_tetro_cell = next_tetro_cells[coord_next[1]][coord_next[0]];
				next_tetro_cell.className = (
					`cell next ${game.next_tetromino.block_type}`
				);
			} catch (ignore) {

			}
		}
	);
};

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function() {
	key_locked = false;
};

document.body.onkeydown = function(event) {
	if (!key_locked && event.key === "ArrowUp") {
		key_locked = true;
		game = Tetris.rotate_ccw(game);
	}
	if (event.key === "ArrowDown") {
		game = Tetris.soft_drop(game);
	}
	if (event.key === "ArrowLeft") {
		game = Tetris.left(game);
	}
	if (event.key === "ArrowRight") {
		game = Tetris.right(game);
	}
	if (event.key === " ") {
		game = Tetris.hard_drop(game);
	}
	if (event.key === "c") {
		game = Tetris.hold(game);
	}
	update_grid();
	update_grid_hold();
	update_grid_next();
	// update_grid_next_tetro();
};
const timer_function = function() {
	game = Tetris.next_turn(game);
	update_grid();
	// update_grid_next_tetro();
	update_grid_hold();
	update_grid_next();
	setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);
update_grid();
update_grid_hold();
update_grid_next();
// update_grid_next_tetro();
