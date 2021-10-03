import React from 'react'
import ViewPost from '../Components/ViewPost/View';
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'


export default function PostView() {
	return (
		<>
			<Navbar/>
			<ViewPost/>
			<Footer nomargin/>
		</>
	)
}