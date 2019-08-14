export default function pauseGame(data) {
    return {
        type: 'server/pauseGame',
        data
    };
}