import PlayerModel from '../models/Player.model';

class PlayerController {

    static async createNewPlayer(name, gameId, socketId, isHost) {
        try {
            const newPlayer = await new PlayerModel({ name, gameId, socketId, isHost });

            await newPlayer.save();
            return newPlayer;
        } catch(e) {
           throw e;
        }
    }

    static async deletePlayer(playerId) {
        try {
            await PlayerModel.remove({ id: playerId });
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

    static async updatePlayer(playerId, data) {
        try {
            let columnsToUpdate = {};
            if (data.map) columnsToUpdate.map = data.map;
            if (data.lost) columnsToUpdate.haveWon = data.lost;
            if (data.score) columnsToUpdate.score = data.score;

            const player = await PlayerModel.findOneAndUpdate({ _id: playerId }, columnsToUpdate, { new: true });
            return player;
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerController;