export default function getGames(data) {
    return {
        type: 'server/getAllGames',
        data
    };
}