import {createContext, useState} from 'react'

export const PostContext = createContext(null);

export default function Postcontext({children}) {
	const [post, setPost] = useState(null);
  	return ( 
	  	<PostContext.Provider value={{post,setPost}}>
	        {children}
	    </PostContext.Provider>
    )
}