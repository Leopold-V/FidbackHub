export const getProjects = async (token: string) => {
    const data = await fetch(`http://localhost:1337/api/projects`, {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}

export const addProject = async (id: string, jwt: string, project) => {
    const data = await fetch(`http://localhost:1337/api/projects`, {
        method: 'POST',
        body: JSON.stringify({data: {...project, user: id}}),
        headers: {
            'authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const json = await data.json();
    return json;
}