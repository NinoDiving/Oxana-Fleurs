import "./Header.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SpaIcon from "@mui/icons-material/Spa";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function NavBar() {
  const [value, setValue] = useState<number>(0);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlHeader = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => controlHeader();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controlHeader]);
  return (
    <header
      className={`main-nav ${show ? "main-nav-visible" : "main-nav-hidden"}`}
    >
      <BottomNavigation
        className="nav-bar"
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} href="/" />
        <BottomNavigationAction
          label="Fleurs"
          icon={<LocalFloristIcon />}
          href="/bouquets"
        />
        <BottomNavigationAction
          label="Plantes"
          icon={<SpaIcon />}
          href="/plantes"
        />
        <BottomNavigationAction
          label="Panier"
          icon={<ShoppingBasketIcon />}
          href="/panier"
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon />}
          href="/login"
        />
      </BottomNavigation>
    </header>
  );
}
