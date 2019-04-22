import PlayerModel from '../models/Player.model';

class PlayerController {

    static async createNewPlayer(name, gameId, socketId, isHost) {
        try {
            const newPlayer = new PlayerModel({ name, gameId, socketId, isHost });
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
            const player = PlayerModel.findOne({ name: playerId });
            return player;
        } catch (e) {
            throw e;
        }
    }

    static async updatePlayer(playerId, data) {
        try {
            const player = PlayerModel.findOneAndUpdate({ id: playerId }, { name: 'batman' }, { new: true });
            return player;
        } catch (e) {
            throw e;
        }
    }

}

export default PlayerController;