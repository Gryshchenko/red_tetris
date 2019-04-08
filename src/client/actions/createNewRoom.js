export default function createNewRoom(data) {

  return {
    type: 'server/createNewRoom',
    data,
  }
}
