import PlayerModel from '../models/Player.model';

class PlayerController {

    static async createNewPlayer(name, gameId, socketId, isHost) {
        try {
            const newPlayer = await new PlayerModel({ name, gameId, socketId, isHost });
            const oldPlayer = await this.getPlayerByName(newPlayer.name);
            if (oldPlayer) {
                await this.deletePlayer(oldPlayer._id);
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

    static async getPlayers() {
      try {
        let players = await PlayerModel.find({});

        return players;
      } catch (e) {
        throw `Error occured while getAllPlayers: ${e}`;
      }
    }

    static async getTop20() {
      try {
        let players = await PlayerModel.find({
          score: { $gt: 1 }
        }).limit(20).sort({ score: -1 }).exec();

        return players;
      } catch (e) {
        throw `Error occured while getTop20: ${e}`;
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

  static async updatePlayerOnlineStatus(data) {
    try {
      let columnsToUpdate = {};
      if (data.lastActiveTime) columnsToUpdate.lastActiveTime = data.lastActiveTime;
      const player = await PlayerModel.findOneAndUpdate({ _id: data.playerId }, columnsToUpdate);
      return player;
    } catch (e) {
      throw e;
    }
  }

    static async updatePlayer(playerId, data) {
        try {
            let columnsToUpdate = {};
            if (data.map) columnsToUpdate.map = data.map;
            if (data.lost) columnsToUpdate.lost = data.lost;
            if (data.score > -1) columnsToUpdate.score = data.score;
            if (data.clearedRows > -1) columnsToUpdate.clearedRows = data.clearedRows;
            if (data.currentPiece > -1) columnsToUpdate.currentPiece = data.currentPiece;

            const player = await PlayerModel.findOneAndUpdate({ _id: playerId }, columnsToUpdate, { new: true });
            return player;
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerController;
