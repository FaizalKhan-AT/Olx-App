import React,{createContext,useState} from 'react'

export const BannerFilter = createContext(null)
export const NavbarLocation = createContext(null)
export const SearchBarContext = createContext(null)

export default function FilterContexts ({children})  {
	const [smallBannerFilter,setSmallBannerFilter] = useState(null) 
	const [locationSearchVal,setLocationSearch] = useState(null)
	const [searchBarValue,setSearchBarValue] = useState(null)
	const [searchResults,setSearchResults] = useState([])
	return (
		<NavbarLocation.Provider value={{locationSearchVal,setLocationSearch}}>
			<SearchBarContext.Provider value={{searchBarValue,setSearchBarValue,searchResults,setSearchResults}}>			
				<BannerFilter.Provider value={{smallBannerFilter,setSmallBannerFilter}}>		
					{children}
				</BannerFilter.Provider>
			</SearchBarContext.Provider>
		</NavbarLocation.Provider>
	)
} 