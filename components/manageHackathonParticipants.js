import { select } from '@clack/prompts';
import main from './main.js';
import User from '../models/User.js';

async function editUser(user,hackathonDataObject) {
    let editSelect = await select({
        message: 'Manage Participants',
        options: [{
            label:`Change Role (current : ${hackathonDataObject?.participants.find(participant => participant.githubID === user)?.role })`,
            value:"role"
        },
        {
            label:"Remove Participant",
            value:"remove"
        },
        {
            label:"Back to Main",
            value:"main"
        },
    ]})
    switch(editSelect){
        case "role":
            let selectRole = await select({
                message: 'Manage Role',
                options: [{
                    label:"Participant",
                    value:"participant"
                },
                {
                    label:"Judge",
                    value:"judge"
                },
                {
                    label:"Host",
                    value:"host"
                }
            ]})
            const participant = hackathonDataObject.participants.find(participant => participant.githubID === user);
            const userDb = await User.findOne({ githubID: user });
            if (participant) {
                participant.role = selectRole;
                hackathonDataObject.participants = hackathonDataObject.participants.map(p => p.githubID === user ? participant : p);
            const userHackathon = userDb.hackathons.find(hackathon => hackathon.hackathonId === hackathonDataObject.id);
            if (userHackathon) {
                userHackathon.role = selectRole;
                await userDb.save();
            }
            await hackathonDataObject.save();
            main()
            break
        }
        case "remove":
            const participantIndex = hackathonDataObject.participants.findIndex(participant => participant.githubID === user);
            if (participantIndex !== -1) {
                hackathonDataObject.participants.splice(participantIndex, 1);
                await hackathonDataObject.save();
            }
            await User.updateOne(
                { githubID: user },
                { $pull: { hackathons: { hackathonId: hackathonDataObject.id } } }
            );
            main()
            break;
        case "main":
            main()
            break;
    }
}

async function manageHackathonParticipants(hackathonDataObject) {

        const choices = hackathonDataObject.participants.map((participant) => ({
            name: `${participant.githubID} (${participant.role})`,
            value: participant.githubID
        }));
        const selectedParticipant = await select({
            message: 'Manage Participants',
            options: choices,
            validate: (input) => {
            if (hackathonDataObject.participants.find(participant => participant.githubID === input)?.role === 'host') {
                return "You're not allowed to manage a host.";
            }
            }
        });
        editUser(selectedParticipant,hackathonDataObject)
        

}

export default manageHackathonParticipants;