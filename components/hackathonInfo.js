import cliMd from 'cli-markdown';


function hackathonInfo(id,host,startTime,endTime,website,contact,md){

    console.log(cliMd(`
        # ${id}
        
        ## by ${host}
        
        ### Start (UTC): ${new Date(startTime*1000).toLocaleString()}
        ### End (UTC): ${new Date(endTime*1000).toLocaleString()}
    
        ### Website: ${website||"N/A"}
        ### contact: ${contact}
    
    
        ---
    
        `));
    console.log(cliMd(md||""));
}

export default hackathonInfo;