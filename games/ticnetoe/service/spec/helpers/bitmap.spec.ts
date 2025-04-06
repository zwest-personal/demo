import {createBitmap, updateBitmap} from '@src/helpers/bitmap';

const testBoard: (string | null)[][] = [
  ['C', 'B', 'C'],
  ['C', 'B', 'A'],
  ['A', 'A', null],
];

const binaryBoardA: number[] = [
  0b000,
  0b001,
  0b110,
];

const binaryBoardAUpdated: number[] = [
  0b100,
  0b001,
  0b111,
];

describe('Bitmap', () => {
  it('should create 2d bitmap', () => {
    expect(createBitmap('A', testBoard)).toStrictEqual(binaryBoardA);
  });

  it('should update the top left bit and bottom right bit', () => {
    const board = createBitmap('A', testBoard);
    updateBitmap(board, 0, 0);
    updateBitmap(board, 2, 2);
    expect(board).toStrictEqual(binaryBoardAUpdated);
  });
});