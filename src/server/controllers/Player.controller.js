import PlayerModel from '../models/Player.model';

class PlayerController {
    static async createNewPlayer(name) {
        const newPlayer = new PlayerModel({ name });
        await newPlayer.save();
        return newPlayer.info;
    }
}

export default PlayerController;