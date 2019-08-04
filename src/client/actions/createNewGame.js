export default function createNewGame(data) {

  return {
    type: 'server/createNewGame',
    data,
  }
}
