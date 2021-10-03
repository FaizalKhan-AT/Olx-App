import React from 'react'
import UserProfile from '../Components/UserProfile/UserProfile';
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
export default function UserProfilePage() {
	return (
		<>
			<Navbar/>
			<UserProfile />
			<Footer nomargin/>
		</>
	)
}