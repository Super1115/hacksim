import Hackathon from '../models/Hackathon.js';

async function checkIfHackathonExists(id, returnData=false) {
    let hackathonWtihSameID = await Hackathon.findOne({ id: id  });
    if(hackathonWtihSameID) {
        if(returnData) {
            return hackathonWtihSameID;
        }
        return true;
    }
    else {
        return false;
    }
}

export default checkIfHackathonExists;