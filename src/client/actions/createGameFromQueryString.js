export default function createGameFromQueryString(data) {

  return {
    type: 'server/createGameFromQueryString',
    data,
  }
}
