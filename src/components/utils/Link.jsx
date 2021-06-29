import React, { useState } from "react";

const Link = ({ className, href, setCurrentPath, children }) => {

  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", href)

    setCurrentPath(window.location.pathname)

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent); 
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;