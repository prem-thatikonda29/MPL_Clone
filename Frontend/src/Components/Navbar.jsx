import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faWallet,
  faUserAlt,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
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
            <Link to={"/wallet"}>
              <FontAwesomeIcon icon={faWallet} className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link to={"/profile"}>
              <FontAwesomeIcon icon={faUserAlt} className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link to={"/contests"}>
              <FontAwesomeIcon icon={faFutbol} className={styles.icon} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
