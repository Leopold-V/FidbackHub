import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useFetch = (url: string, requestInfo: RequestInit) => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [data, setData] = useState(null);

    const sendGetRequest = async () => {
        seterror(false);
        setloading(true);
        try {
            const data = await fetch(url, requestInfo);
            const json = await data.json();
            setData(json);
        } catch (error) {
            seterror(error.message);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        sendGetRequest();
    }, [])

    return { data, error, loading }
}