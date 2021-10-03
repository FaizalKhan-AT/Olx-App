import React,{createContext,useState} from 'react';

export const Userview = createContext(null);

export default function UserView ({children}) {
	const [userView,setUserView] = useState(null)
	return (
		<Userview.Provider value={{userView,setUserView}}>
			{children}
		</Userview.Provider>
	)
}