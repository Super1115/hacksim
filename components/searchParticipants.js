import { confirm,select } from "@clack/prompts";
import participantInfo from "./participantInfo.js";
import main from "./main.js";
import User from "../models/User.js";
import hackSimTitle from "./hackSimTitle.js";

async function searchParticipants(hackathonDataObject){
    console.clear();
    hackSimTitle();
    const choices = hackathonDataObject.participants.map(participant => {
        let label = `${participant.githubID} (${participant.role})`;
        return {
            value: participant.githubID,
            label: label
        };
    });
    
    const selectedParticipant = await select({
        message: 'Participant',
        options: choices
    });
    console.clear();
    hackSimTitle();
    const userData = await User.findOne({githubID : selectedParticipant});
    participantInfo(userData.githubID,userData.name,userData.email,userData.githubUrl,userData.md)
    await confirm({message: `Back?`,default: true});
    main()

}

export default searchParticipants
