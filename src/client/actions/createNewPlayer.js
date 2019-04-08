export default function createNewPlayer(data) {

  return {
    type: 'server/createNewPlayer',
    data,
  }
}
