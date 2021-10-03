import { createContext, useState} from 'react'


export const fireBaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context ({ children }) {
  const [User, setUser] = useState(null);
  return ( <AuthContext.Provider value={{User,setUser}}>
        {children}
    </AuthContext.Provider>)
}

