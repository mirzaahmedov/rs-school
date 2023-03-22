import { Outlet, NavLink } from "react-router-dom"
import styles from "./layout.module.css"

const Layout = () => {
  return (
    <>
      <header className={styles.Navlinks}>
        <NavLink className={styles.Navlink} to="/">Home</NavLink>
        <NavLink className={styles.Navlink} to="/forms">Forms</NavLink>
        <NavLink className={styles.Navlink} to="/about">About Us</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout
