import React, { SyntheticEvent, useEffect, useState } from 'react';

import styles from "../styles/backtotop.module.css";

const BackToTop: React.FC = (props) => {
  const [hideButton, setHideButton] = useState<boolean>(true)

  const toggleVisibility = () => {
    if(window.pageYOffset > 300) {
      setHideButton(false)
    }
    else {
      setHideButton(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
  }, [])

  const handleClick = (event : SyntheticEvent) => {
    event.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return <button className={styles.backToTop} onClick={handleClick} title="Go to Top" id="backToTop" hidden={hideButton}>Top</button>
}

export default BackToTop;