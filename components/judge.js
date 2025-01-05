import { select,confirm } from '@clack/prompts';
import hackSimTitle from './hackSimTitle.js';
import main from "./main.js"
// import Hackathon from '../models/Hackathon.js';
import submitTeamInfo from "./submitTeamInfo.js"

async function judge(hackathonDataObject){
    console.clear();
    hackSimTitle();
    const submittedTeams = []
    for (let x in hackathonDataObject.team){
        if(x[0].isSubmit===true){
            submitTeamInfo +=x 
        }
    }

    
    if (submittedTeams.length === 0) {
        console.log('No teams have submitted their projects.');
        await confirm({message: `Back to Main?`, default: true});
        main();
        return;
    }

    const teamOptions = submittedTeams.map(team => {
        return {value: team.id, label: team.id};
    });

    const selectedTeam = await select({
        message: 'Select a team that has submitted their project:',
        options: teamOptions
    });

    if (selectedTeam) {
        submitTeamInfo();
    }

    await confirm({message: `Back to Main?`, default: true});
    main();
}

export default judge
