import { confirm,select } from "@clack/prompts";
import teamInfo from "./teamInfo.js";
import main from "./main.js";
import hackSimTitle from "./hackSimTitle.js";
import store from "store";

async function teams(hackathonDataObject){
    console.clear();
    hackSimTitle();
    if (hackathonDataObject.team.length === 0) {
        console.log('No teams available.');
        await confirm({ message: 'Back to Main?', default: true });
        main();
        return;
    }

    const choices = hackathonDataObject.team.map(team => {
        return {
            value: team.id,
            label: team.id
        };
    });
    
    const selectedTeam = await select({
        message: 'Teams',
        options: choices
    });
    console.clear();
    hackSimTitle();
    const teamData = await hackathonDataObject.team.find(team => team.id === selectedTeam)
    teamInfo(teamData.id,teamData.repo,teamData.members,teamData.md,teamData.leader)

    if (teamData.id.startsWith('*')) {
        console.log('NOT able to provide option to join, Teams that start with "*" are for individual participants.');
        await confirm({ message: 'Back to Main?', default: true });
    } else {
        const action = await select({
            message: 'What would you like to do?',
            options: [
                { value: 'join', label: 'Join Team' },
                { value: 'back', label: 'Back to Main' }
            ]
        });

        if (action === 'join') {
            const previousTeam = hackathonDataObject.team.find(team => team.members.includes(store.get("user").githubID));
            if (previousTeam) {
                previousTeam.members = previousTeam.members.filter(member => member !== store.get("user").githubID);
            }
            previousTeam,save()
            teamData.members += store.get("user").githubID
            teamData.save()
            const participant = hackathonDataObject.participants.find(participants.githubID === store.get("user").githubID)
            participant.team = teamData.id
            participant.save()
            console.log(`You have joined the team: ${teamData.id}`);
            await confirm({ message: 'Back to Main?', default: true });
        }
    }
    main()

}

export default teams
