import React, { useEffect, useState, useCallback } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [links, setLinks] = useState([
    { text: 'Item1', href: 'https://www.google.com' },
    { text: 'Item2', href: 'https://www.google.com' },
    { text: 'Item3', href: 'https://www.google.com' },
    { text: 'Item4', href: 'https://www.google.com' },
  ]);

  const [moreLinks, setMoreLinks] = useState([]);

  const updateRightmostPosition = useCallback(() => {
    //const navbarElement = document.querySelector('.navbar');
    const linksElement = document.querySelector('.links');
    const moreElement = document.querySelector('.more');

    // Check if there is enough space to move an item from moreLinks to links
    if (moreLinks.length > 0) {
      const linkStyles = window.getComputedStyle(linksElement);
      const moreStyles = window.getComputedStyle(moreElement);
      console.log(parseFloat(linkStyles.getPropertyValue('margin-right')) + parseFloat(moreStyles.getPropertyValue('margin-left')));
      if(parseFloat(linkStyles.getPropertyValue('margin-right')) + parseFloat(moreStyles.getPropertyValue('margin-left')) >= 295) {
        const newMoreLinks = [...moreLinks];
        const movedLink = newMoreLinks.shift(); // Remove the first link from moreLinks

        setLinks((prevLinks) => [...prevLinks, movedLink]);
        setMoreLinks(newMoreLinks);
      }
    }

    // Check if navbar size is less than links size and move last link to moreLinks
    if (window.innerWidth < linksElement.getBoundingClientRect().right) {
      const newLinks = links.slice(0, -1);
      const lastLink = links[links.length - 1];

      setLinks(newLinks);
      setMoreLinks((prevMoreLinks) => [...prevMoreLinks, lastLink]);
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
      <h1 className="title"> Menu </h1>
      <div className="links">
        {links.map((link, index) => (
          <a key={index} className="item" href={link.href}>
            {link.text}
          </a>
        ))}
      </div>
      {moreLinks.length > 0 && (
          <div className="more">
            More
            {/* Dropdown or other UI element for moreLinks */}
          </div>
        )}
    </div>
  );
};

export default Navbar;
 