import createNewPlayer from '../actions/createNewPlayer'
// import disconnect from '../actions/disconnect'
const parseUrl = (data) => {
  const hash = data.hash
  const matches = hash && hash.match(/#([^\[]+)\[([^\]]+)\]/)
  return (matches ? { name: matches[2], room: matches[1] } : null)
}
const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  if (socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    if (action.type == '@@router/LOCATION_CHANGE') {
      const data = parseUrl(action.payload);
      const state = getState();
      if (state.game.room) {
        // dispatch(disconnect(data))
      } 
      
      // dispatch(createNewPlayer(data))
    }
    if (socket && action.type && action.type.indexOf('server/') === 0) {
      const serverAction = action.type.split('/');
      socket.emit(serverAction[1], action.data);
    }

    return next(action);
  }
}

export {
  parseUrl,
  socketIoMiddleWare,
};
