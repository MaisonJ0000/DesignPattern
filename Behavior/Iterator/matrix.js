export class Matrix {
  constructor (inMatrix) {
    this.data = inMatrix;
  }

  get (row, col) {
    if (row > this.data.length ||
      col > this.data[row].length) {
      throw new RangeError('Out of bounds');
    }
    return this.data[row][col];
  }

  set (row, col, val) {
    if (row >= this.data.length ||
      col > this.data[row.length]) {
      throw new RangeError('Out of bounds');
    }
    this.data[row][col] = val;
  }

  [Symbol.iterator] () {
    let nextRow = 0;
    let nextCol = 0;

    return {
      next: () => {
        if (nextRow === this.data.length) {
          return {done: true};
        }

        const currVal = this.data[nextRow][nextCol];

        if (nextCol === this.data[nextRow].length -1 ) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }
        return { value: currVal };
      }
    }
  }
}

const matrix2x2 = new Matrix([
  ['11', '12'],
  ['21', '22']
])

const iterator = matrix2x2[Symbol.iterator]();
let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.info(iterationResult.value);
  iterationResult = iterator.next();
}

for (const el of matrix2x2) {
  console.info(el);
}

const flattenedMatrix = [...matrix2x2];
console.log(flattenedMatrix);

const [oneOne, oneTwo, twoOne, twoTwo] = matrix2x2;
console.info(oneOne, oneTwo, twoOne, twoTwo);
