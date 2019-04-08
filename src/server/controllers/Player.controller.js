import PlayerModel from '../models/Player.model';

class PlayerController {

    static async createNewPlayer(name) {
        try {
            const newPlayer = new PlayerModel({ name });
            await newPlayer.save();
            return newPlayer.get;
        } catch(e) {
            console.log(e)
        }
    }

    static async deletePlayer(playerId) {
        await PlayerModel.remove({ id: playerId });
    }

    static async getPlayer(playerId) {
        const player = PlayerModel.findOne({ name: playerId });
        return player.get;
    }

    static async updatePlayer(playerId, data) {
        const player = PlayerModel.findOneAndUpdate({ id: playerId }, { name: 'batman' }, { new: true });
        return player.get;
    }

}

export default PlayerController;