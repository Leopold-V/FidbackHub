export const getUser = async (id: string, jwt: string) => {
    const data = await fetch(`http://localhost:1337/api/users/${id}?populate=*`, {
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

export const updateUser = async (id: string, jwt: string, userData) => {
    const data = await fetch(`http://localhost:1337/api/users/${id}`, {
        method: 'put',
        body: JSON.stringify({ ...userData }),
        headers: {
          'authorization': 'Bearer ' + jwt,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const json = await data.json();
      return json;
}