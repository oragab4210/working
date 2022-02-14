import styles from "./SideNav.module.css";
import React, { useState, useEffect, useRef } from "react";
import SideBar from "../SideBar/SideBar";
import { Router, Route, Switch, useLocation } from "react-router-dom";

const SideNav = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [pathname]);
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
      // setClose(true);
    }
  };
  return (
    <div className={styles.container} ref={wrapperRef}>
      <div
        className={styles.hamburger}
        onClick={() => [setOpen(!open), console.log("side nav", open)]}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>
      <ul className={`${styles.optionList} ${open ? styles.open : null}`}>
        <SideBar />
      </ul>
    </div>
  );
};

export default SideNav;
