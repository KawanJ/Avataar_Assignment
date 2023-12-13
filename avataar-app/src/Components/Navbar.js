import React, { useEffect, useState, useCallback } from 'react';
import './Navbar.css';
import logo from './..\\asset\\Intersectlogo.png'
import searchIcon from './..\\asset\\search.png'
import downArraw from './..\\asset\\Vector.png'


const Navbar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [links, setLinks] = useState([
    { text: 'HOME', href: 'https://www.avataar.ai' },
    { text: 'ELECTRONICS', href: 'https://www.avataar.ai' },
    { text: 'MOVIES', href: 'https://www.avataar.ai' },
    { text: 'BOOK', href: 'https://www.avataar.ai' },
    { text: 'MUSIC', href: 'https://www.avataar.ai' },
    { text: 'CLOTHES', href: 'https://www.avataar.ai' },
    { text: 'GAMES', href: 'https://www.avataar.ai' },
    // { text: 'FURNITURE', href: 'https://www.avataar.ai' },
    // { text: 'ACCESSORIES', href: 'https://www.avataar.ai' },
  ]);

  const [moreLinks, setMoreLinks] = useState([]);

  const updateRightmostPosition = useCallback(() => {
    // const navbarElement = document.querySelector('.navbar');
    const linksElement = document.querySelector('.links');
    const moreElement = document.querySelector('.more');
    // const searchElement = document.querySelector('.search');

    const linkStyles = window.getComputedStyle(linksElement);

    // Check if there is enough space to move an item from moreLinks to links
    if (moreLinks.length > 0) {
      const moreStyles = window.getComputedStyle(moreElement);
      if(parseFloat(linkStyles.getPropertyValue('margin-right')) + parseFloat(moreStyles.getPropertyValue('margin-left')) >= (moreLinks[moreLinks.length - 1].text.length * 7) + 80) {
        const newMoreLinks = moreLinks.slice(0, -1);
        const movedLink = moreLinks[moreLinks.length - 1];

        setLinks((prevLinks) => [...prevLinks, movedLink]);
        setMoreLinks(newMoreLinks);
      }

      if(parseFloat(linkStyles.getPropertyValue('margin-right')) + parseFloat(moreStyles.getPropertyValue('margin-left')) <= 8 && links.length > 0) {
        const newLinks = links.slice(0, -1);
        const lastLink = links[links.length - 1];

        setLinks(newLinks);
        setMoreLinks((prevMoreLinks) => [...prevMoreLinks, lastLink]);
      }
    }

    // Check if navbar size is less than links size and move last link to moreLinks
    else if ( parseFloat(linkStyles.getPropertyValue('margin-right')) <= 24 && links.length > 0 && moreLinks.length === 0) {
      const newLinks = links.slice(0, -1);
      const lastLink = links[links.length - 1];

      
      setLinks(newLinks);
      setMoreLinks((prevMoreLinks) => [...prevMoreLinks, lastLink]);
    }

    //Check for duplicate first item in moreLinks
    if(moreLinks.length>=2 && moreLinks[0] === moreLinks[1]) {
      moreLinks.shift();
    }
  }, [links, moreLinks]);

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', updateRightmostPosition);

    updateRightmostPosition();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateRightmostPosition);
    };
  }, [updateRightmostPosition]); 

  return (
    <div className="navbar">
      <div className="logo"> 
        <img src={ logo } alt="Logo"></img>
        <div className="logo-text">
          E-COMM
        </div>
      </div>
      <div className="links">
        {links.map((link, index) => (
          <a key={index} className="item" href={link.href}>
            {link.text}
          </a>
        ))}
      </div>
      {moreLinks.length > 0 && (
        <div className="more" onClick={toggleDropdown}>
          MORE <img src={ downArraw } alt="Arrow"></img>
          <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
            {moreLinks.map((link, index) => (
              <a key={index} href={link.href}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="search">
        <img src={ searchIcon } alt="search icon"></img>
        <div className="search-text">
          Search Something 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
 