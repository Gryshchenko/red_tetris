const flipMatrix = matrix => (
    matrix[0].map((column, index) => (
      matrix.map(row => row[index])
    ))
);

const randomNumber = (num) => Math.floor(Math.random() * num)

export {
    flipMatrix,
    randomNumber
}