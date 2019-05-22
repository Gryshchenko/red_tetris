const getRoomName = () => {
    const hash = window.location.hash;
    const roomNameStart = hash.indexOf("e/");
    const roomNameEnd = hash.indexOf("[");
    const roomName = hash.slice(roomNameStart + 2, roomNameEnd);
    if (roomNameStart === -1 || roomNameEnd === -1) {
        return (null);
    }
    return roomName;
};
const getName = () => {
    const hash = window.location.hash;
    const nameStart = hash.indexOf("[");
    const nameEnd = hash.indexOf("]");
    const name = hash.slice(nameStart + 1, nameEnd);
    if (nameStart === -1 || nameEnd === -1) {
        return (null);
    }
    return name;
}

export {
    getRoomName,
    getName,
};
