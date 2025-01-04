import hackSimTitle from "./hackSimTitle.js";
import { select,confirm,text } from "@clack/prompts";
import checkIfHackathonExists from '../api/checkIfHackathonExists.js';
import main from "./main.js";
import store from 'store';
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
            if(await confirm({message: 'Confirm to join?',default: true})){
                let participantData = { 
                    githubID: UID, 
                    name: name, 
                    team: null, 
                    role: 'participant' 
                };
                findHackathonByID.participants.push(participantData);
                await findHackathonByID.save();

                let userDb = await User.findOne({ githubID: store.get("user").githubID });
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
            const menu = await select({
                message: 'The Hackathon does not exist.',
                options: [
                  { value: 'enter', label: 'Enter Again' },
                  { value: 'menu', label: 'Back'},
                ],
              });
            switch(menu){
                case "enter":
                    console.clear();
                    break;
                case "menu":
                    main()
                    break;
            }
        }
        
    }

 


    

}


export default joinHackathon;