import hackSimTitle from "./hackSimTitle.js";
import { select,confirm,text } from "@clack/prompts";
import checkIfHackathonExists from '../api/checkIfHackathonExists.js';
import main from "./main.js";
import User from '../models/User.js';
import hackathonInfo from "./hackathonInfo.js";

async function joinHackathon(name, UID) {
    while (true) {
        console.clear();
        hackSimTitle();
        const inputHackathonID = await text({ 
            message: 'Enter Hackathon ID:',
            validate(value) {
                if (value.length === 0) return 'Value is required!';
            }
        });

        const findHackathonByID = await checkIfHackathonExists(inputHackathonID, true);


        if (findHackathonByID) {
            console.clear();
            hackSimTitle();
            hackathonInfo(findHackathonByID.id,findHackathonByID.host,findHackathonByID.startTime,findHackathonByID.endTime,findHackathonByID.website,findHackathonByID.contact, findHackathonByID.md);
            const isAlreadyParticipant = findHackathonByID.participants.some(participant => participant.githubID === UID);
            if (isAlreadyParticipant) {
                console.log('You are already in this hackathon.');
                await confirm({message: 'Back?',default: true});
                main();
                break;
            }
            if(await confirm({message: 'Confirm to join?',default: true})){
                let participantData = { 
                    githubID: UID, 
                    name: name, 
                    team: `*${UID}`, 
                    role: 'participant' ,
                };
                let teamData = {
                    id: `*${UID}`,
                    members : [UID],
                    leader: UID
                  }
                findHackathonByID.participants.push(participantData);
                findHackathonByID.team.push(teamData)
                await findHackathonByID.save();

                let userDb = await User.findOne({ githubID: UID });
                userDb.hackathons.push({hackathonId: findHackathonByID.id, role: 'participant'});
                userDb.save();
                main()
                break
            }
            else{
                main()
                break
            }
        } 
        else {
            console.clear();
            hackSimTitle();
            await confirm({message: 'The Hackathon does not exist',default: true})
              main()
              break
        }
        
    }

 


    

}


export default joinHackathon;