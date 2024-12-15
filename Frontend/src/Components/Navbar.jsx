import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../Styles/Navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link to={"/home"}>
              <FontAwesomeIcon icon={faHouse} className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link to={"/flappybird"}>
              <FontAwesomeIcon icon={faBars} className={styles.icon} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
