import { projectType, userType } from 'types/index';

export const getProjects = async (token: string, id: number) => {
  const data = await fetch(`http://localhost:3000/api/projects?userId=${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const getProjectsFromUser = async (jwt: number) => {
  const data = await fetch(`http://localhost:1337/api/project-user`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const addProject = async (id: number, project: Partial<projectType>, jwt: string): Promise<projectType> => {
  const data = await fetch(`http://localhost:3000/api/projects/create-project`, {
    method: 'POST',
    body: JSON.stringify({ project: { ...project }, user: id }),
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const deleteProject = async (id: number, jwt: string): Promise<projectType> => {
  const data = await fetch(`http://localhost:3000/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const updateProject = async (project: Partial<projectType>, jwt: string): Promise<any> => {
  const data = await fetch(`http://localhost:3000/api/projects/${project.id}`, {
    method: 'PUT',
    body: JSON.stringify({ project: { ...project } }),
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};

export const leaveProject = async (projectId: number, members: userType[], jwt: string): Promise<any> => {
  const data = await fetch(`http://localhost:1337/api/projects/${projectId}/leave`, {
    method: 'PUT',
    body: JSON.stringify({ data: { id: projectId, members: members } }),
    headers: {
      Authorization: 'Bearer ' + jwt,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  console.log(json);
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json;
};
