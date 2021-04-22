import React, {createContext, useState} from 'react';
import useServerSync from '../hooks/useServerSync';

export const ARContext = createContext({
  path: [],
  data: [{pathName: '', path: []}],
  getPath: async () => {},
});

export const ARContextProvider = ({children}) => {
  const [data, setData] = useState([]);
  const [path, setPath] = useState([]);

  const update = dt => setData(dt);

  useServerSync({update});

  const getPath = async code => {
    for (let i = 0; i < data.length; i++) {
      if (code === data[i].pathName) {
        setPath([...data[i].path]);
        return;
      }
    }
  };

  const value = {path, getPath, data};
  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
};
