import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Banner from '../Components/Banner/Banner'
import Posts from '../Components/Posts/Posts'
import Footer from '../Components/Footer/Footer'
function Home() {
    return (
      <div>
        <Navbar />
        <Banner />
        <Posts />
        <Footer />
      </div>
    );
}

export default Home
