import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `Hold can't be performed twice in a row:
        Given a Tetris Game where a Hold is performed;
        When one further Hold is performed;
        Then the game state before and after the second hold, is the same.`,
        function () {
            const initial_game = Tetris.hold(Tetris.new_game());
			const final_game = Tetris.hold(initial_game);
			if (!R.equals(initial_game, final_game)) {
			    throw new Error(
			        `The inital and final game do not match
			        Initial: ${JSON.stringify(initial_game)}
			        Final:   ${JSON.stringify(final_game)}`
			    );
			}
        }
    );

    it(
        `If there is no held piece and a hold performed:
         The next tetromino is deployed;
         When a hold is performed;
         Then the next tetromino is same as the hold tertromino.`,
        function () {
			const initial_game = Tetris.new_game();
			const initial_next_piece = initial_game.next_tetromino;
			const hold_game = Tetris.hold(initial_game);
			if(!R.equals(initial_game, hold_game)){
				const final_next_piece = hold_game.current_tetromino;
				if (!R.equals(initial_next_piece, final_next_piece)) {
				    throw new Error(
				        `The inital and final next_tetromino do not match
				        Initial: ${JSON.stringify(initial_next_piece)}
				        Final:   ${JSON.stringify(final_next_piece)}`
				    );
				}
			}
			
			
        }
    );
});
