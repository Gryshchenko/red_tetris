import PlayerModel from '../models/Player.model';

class PlayerController {

    static async createNewPlayer(name, gameId, socketId, isHost) {
        try {
            const newPlayer = await new PlayerModel({ name, gameId, socketId, isHost });
            const oldPlayer = await this.getPlayerByName(newPlayer.name);
            if (oldPlayer.name) {
                await this.deletePlayer(oldPlayer._id);
                console.error("Prev player deleted: " + oldPlayer.name + ", _id: " + oldPlayer._id);
            }

            await newPlayer.save();
            return newPlayer;
        } catch(e) {
           throw e;
        }
    }

    static async deletePlayer(playerId) {
        try {
            await PlayerModel.remove({ _id: playerId });
        } catch (e) {
            throw e;
        }
    }

    static async getPlayer(playerId) {
        try {
            const player = await PlayerModel.findOne({ _id: playerId });

            return player;
        } catch (e) {
            throw e;
        }
    }
  static async getPlayerByName(playerName) {
    try {
      const player = await PlayerModel.findOne({ name: playerName });

      return player;
    } catch (e) {
      throw e;
    }
  }

    static async updatePlayer(playerId, data) {
        try {
            let columnsToUpdate = {};
            if (data.map) columnsToUpdate.map = data.map;
            if (data.lost) columnsToUpdate.haveWon = data.lost;
            if (data.score) columnsToUpdate.score = data.score;
            if (data.currentPiece) columnsToUpdate.currentPiece = data.currentPiece;

            const player = await PlayerModel.findOneAndUpdate({ _id: playerId }, columnsToUpdate, { new: true });
            return player;
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerController;
