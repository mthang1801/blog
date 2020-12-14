import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/navbar.module.scss";
import { FaAlignRight } from "react-icons/fa";
import logo from "../../assets/logo.png";
import links from "../../constants/links";
import socialLinks from "../../constants/social-links";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navHeader}>
        <Link to="/" className={styles.logoContainer}>
          <img src={logo} className={styles.logoImage} alt="blog logo" />
        </Link>

        <button type="button" className={styles.toggleBtn} onClick={toggleNav}>
          <FaAlignRight className={styles.logoIcon} />
        </button>
      </div>
      <ul
        className={
          isOpen ? `${styles.navLinks} ${styles.showNav}` : `${styles.navLinks}`
        }
      >
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className={styles.link}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.navSocialLinks}>
        {socialLinks.map((link) => (
          <Link to={link.path} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
