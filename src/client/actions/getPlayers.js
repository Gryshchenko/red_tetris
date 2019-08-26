export default function getPlayers(data) {
  return {
    type: 'server/getPlayers',
    data,
  }
}
