import { useEffect, useState } from 'react';

export const useFetch = (url: string, token: string) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState<boolean | string>(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const doFetch = async () => {
      setloading(true);
      try {
        const data = await fetch(url, {
          headers: {
            authorization: 'Bearer ' + token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          signal: abortController.signal,
        });
        const json = await data.json();
        if (json.error) {
          seterror(json.error.message);
        } else {
          seterror(false);
          setData(json);
        }
        setloading(false);
      } catch (error) {
        if (!abortController.signal.aborted) {
          seterror(error.message);
          setloading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, []);

  return { data, error, seterror, loading };
};
