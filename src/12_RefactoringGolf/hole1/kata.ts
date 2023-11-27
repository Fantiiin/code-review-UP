/* eslint-disable */

export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  private readonly PLAYER_O = 'O';
  private readonly EMPTY_PLAY = ' ';

  private readonly FIRST_ROW = 0;
  private readonly SECOND_ROW = 1;
  private readonly THIRD_ROW = 2;
  private readonly FIRST_COLUMN = 0;
  private readonly SECOND_COLUMN = 1;
  private readonly THIRD_COLUMN = 2;

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == this.EMPTY_PLAY) {
      if (player == this.PLAYER_O) {
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
    if (this._board.TileAt(x, y).Symbol != this.EMPTY_PLAY) {
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
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(this.FIRST_ROW, this.FIRST_COLUMN)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(this.SECOND_ROW, this.FIRST_COLUMN)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(this.THIRD_ROW, this.FIRST_COLUMN)!.Symbol;
    }

    return this.EMPTY_PLAY;
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(this.FIRST_ROW, this.FIRST_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.FIRST_ROW, this.SECOND_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.FIRST_ROW, this.THIRD_COLUMN)!.Symbol != this.EMPTY_PLAY
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.FIRST_ROW, this.FIRST_COLUMN)!.Symbol ==
        this._board.TileAt(this.FIRST_ROW, this.SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(this.FIRST_ROW, this.THIRD_COLUMN)!.Symbol ==
        this._board.TileAt(this.FIRST_ROW, this.SECOND_COLUMN)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(this.SECOND_ROW, this.FIRST_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.SECOND_ROW, this.SECOND_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.SECOND_ROW, this.THIRD_COLUMN)!.Symbol != this.EMPTY_PLAY
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.SECOND_ROW, this.FIRST_COLUMN)!.Symbol ==
        this._board.TileAt(this.SECOND_ROW, this.SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(this.SECOND_ROW, this.THIRD_COLUMN)!.Symbol ==
        this._board.TileAt(this.SECOND_ROW, this.SECOND_COLUMN)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(this.THIRD_ROW, this.FIRST_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.THIRD_ROW, this.SECOND_COLUMN)!.Symbol != this.EMPTY_PLAY &&
      this._board.TileAt(this.THIRD_ROW, this.THIRD_COLUMN)!.Symbol != this.EMPTY_PLAY
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(this.THIRD_ROW, this.FIRST_COLUMN)!.Symbol ==
        this._board.TileAt(this.THIRD_ROW, this.SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(this.THIRD_ROW, this.THIRD_COLUMN)!.Symbol ==
        this._board.TileAt(this.THIRD_ROW, this.SECOND_COLUMN)!.Symbol
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
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
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