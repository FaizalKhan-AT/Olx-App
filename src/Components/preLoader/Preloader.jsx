import React from 'react'
import './Preloader.css';
function Preloader({sticky}) {
    return (
        <div className='preloader-container'>
            <div className={sticky ? "sticky-preloader" : "preloader"}>
                <div className="preloader-slider"></div>
            </div>
        </div>
    )
}

export default Preloader
