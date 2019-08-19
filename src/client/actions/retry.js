export default function retry(data) {
  console.error(data);
  return {
    type: 'server/retry',
    data,
  }
}
