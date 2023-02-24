import api from '@/data/services/api';
import { useState } from 'react';

export function useData() {
  const [dataGet, setDataGet] = useState([]);
  const getData = async (path: string, limit?: number) => {
    const req = await api
      .get(`/api/${path}`, {
        params: {
          limit: limit ?? Infinity,
        },
      })
      .then((response) => setDataGet(response.data))
      .catch((err) => console.error(err));
    return req;
  };

  return {
    dataGet,
    getData,
  };
}
