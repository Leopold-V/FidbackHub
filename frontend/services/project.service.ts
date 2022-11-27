export const getProjects = async (id: string, jwt: string) => {
    const data = await fetch(`http://localhost:1337/api/projects`, {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}