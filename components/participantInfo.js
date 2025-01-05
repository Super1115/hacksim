import cliMd from 'cli-markdown';


function participantInfo(id,name,email,githubUrl,md){

    console.log(cliMd(`
        # ${id} (${name})
        ## Eamil : ${email||""}
        ## GitHub : ${githubUrl} 
        ---
        `));
    console.log(cliMd(md||""));
}

export default participantInfo;