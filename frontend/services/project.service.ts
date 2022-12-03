import { projectType } from "types/index";

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

export const addProject = async (id: number, project: Partial<projectType>): Promise<projectType> => {
    const data = await fetch(`http://localhost:3000/api/projects/create-project`, {
        method: 'POST',
        body: JSON.stringify({project: {...project, userId: id}}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    if (json.error) {
        throw new Error(json.error.details.errors[0].message);
    }
    return json;
}

export const deleteProject = async (id: number, jwt: string): Promise<projectType> => {
    const data = await fetch(`http://localhost:1337/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': 'Bearer ' + jwt,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    return json;
}

export const updateProject = async (project: Partial<projectType>): Promise<projectType> => {
    const data = await fetch(`http://localhost:3000/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify({project: {...project}}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await data.json();
    if (json.error) {
        throw new Error(json.error.details.errors[0].message);
    }
    return json;
}