
import React,{useRef,useState,useEffect,useContext} from 'react';
import {BannerFilter} from '../../store/FilterContexts'
import './Banner.css';


function Banner() {

  const dropdownRef =  useRef();
  const [open,setOpen] = useState(false);
  const {setSmallBannerFilter} = useContext(BannerFilter)
  const filterItemLink = [
    'OLX Autos (Cars)',
    'Properties',
    'Mobiles',
    'Jobs',
    'Bikes',
    'Electronics & Appliances',
    'Commercial Vehicles & Spares',
    'Furniture',
    'Fashion',
    'Books, Sports & Hobbies',
    'Pets',
    'Services'   
  ]

  useEffect(() => {
    function handleOutsideClick(e) {
      if (open && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
       setOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    }
  },[open]);

    return (
      <div className="banner">
        <div className="categories">
          <div className="dropdown">
            <button className="dropdown-link"
            onClick={() => setOpen(!open)}>
              All Categories
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 1024 1024"
                data-aut-id="icon"
                className={open ? "dropdown-activated-banner" : ''}
              >
                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
              </svg>
            </button>
            <div ref={dropdownRef}  className={open ? "dropdown-menu dropdown-activated-banner":"dropdown-menu"}>
              <h3>Categories</h3>
              <div className="dropdown-category">
              {filterItemLink.map((category,index) => {
                return (
                  <p key={index} onClick={() => {
                    setSmallBannerFilter(category)
                  }}>{category}</p>
                )
              })}
              </div>
            </div>
            <ul className="items">
            {filterItemLink.map((item,index) => {
              return <li key={index} className="item-link"
              onClick={() => {
                setSmallBannerFilter(item)
              }}>{item}</li>
            })
            }
            </ul>
          </div>
        </div>
        <div className="banner-img"></div>
      </div>
    );
}

export default Banner;
