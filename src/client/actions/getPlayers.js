export default function getPlayers(data) {
  return {
    type: 'server/getAllPlayers',
    data,
  }
}
