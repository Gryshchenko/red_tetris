export default function retry(data) {

  return {
    type: 'server/retry',
    data,
  }
}
