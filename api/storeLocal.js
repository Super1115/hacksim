import store from "store";

function storeUser({githubID,name,email,md,hackathons,githubUrl}) {
    store.remove('user');
    store.set('user', {
        "githubID": githubID,
        "name": name,
        "email": email,
        "md": md,
        "hackathons": hackathons,
        "githubUrl": githubUrl
    });
}

export {storeUser};