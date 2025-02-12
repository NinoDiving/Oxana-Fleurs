import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NavBar from "./components/Header/NavBar";
import HomeHeader from "./components/Home/HomeHeader";

function App() {
  return (
    <>
      <Header />
      <HomeHeader />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
