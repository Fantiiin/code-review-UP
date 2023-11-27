const leBonNom = ' ';
const FIRST_ROW = 0;
const SECOND_ROW = 1;
const THIRD_ROW = 2;
const EMPTY_SYMBOL = ' ';

export class Game {
  private _lastSymbol = leBonNom;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY_SYMBOL) {
      if (player == 'O') {
        throw new Error('Invalid first player');
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != EMPTY_SYMBOL) {
      throw new Error('Invalid position');
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowFull(FIRST_ROW) && this.isRowFullWithSameSymbol(FIRST_ROW)) {
      return this._board.TileAt(FIRST_ROW, 0)!.Symbol;
    }

    if (this.isRowFull(SECOND_ROW) && this.isRowFullWithSameSymbol(SECOND_ROW)) {
      return this._board.TileAt(SECOND_ROW, 0)!.Symbol;
    }

    if (this.isRowFull(THIRD_ROW) && this.isRowFullWithSameSymbol(THIRD_ROW)) {
      return this._board.TileAt(THIRD_ROW, 0)!.Symbol;
    }

    return EMPTY_SYMBOL;
  }

  private isRowFull(row: number) {
    return (
      this._board.TileAt(row, 0)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(row, 1)!.Symbol != EMPTY_SYMBOL &&
      this._board.TileAt(row, 2)!.Symbol != EMPTY_SYMBOL
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this._board.TileAt(row, 0)!.Symbol == this._board.TileAt(row, 1)!.Symbol &&
      this._board.TileAt(row, 2)!.Symbol == this._board.TileAt(row, 1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY_SYMBOL };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
