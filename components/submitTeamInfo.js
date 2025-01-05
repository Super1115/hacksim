import cliMd from 'cli-markdown';


function submitTeamInfo(id,members,leader,repo,md){

    console.log(cliMd(`
        # TEAM : ${id} 
        
        ## by

        ### Leader : ${leader||""}
        ### Members : ${members||""}
        
        ## Git Repo : ${repo||""}
        
        # README.md
        ---
        `));
    console.log(cliMd(md||""));
}

export default submitTeamInfo;