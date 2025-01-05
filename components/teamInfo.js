import cliMd from 'cli-markdown';


function teamInfo(id,repo,members,md,leader){

    console.log(cliMd(`
        # ${id}
        ## Team Leader ${leader}
        ### Git Repo : ${repo||""} 
        #### Menbers : ${members||""}
        ---
        `));
    console.log(cliMd(md||""));
}

export default teamInfo;