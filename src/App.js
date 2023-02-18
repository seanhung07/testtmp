import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes } from 'react-router-dom'
import {BrowserRouter as Router} from "react-router-dom";
import { Route } from "react-router-dom";
import Add from './pages/Add';
import {FaDiscord} from 'react-icons/fa';
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const style = { color: "white", fontSize: "1.5em" }
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false)

    const setToggle = () => {
        setExpanded(true)
    }

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  return (
    <div className="App">
        <Router>
        <Navbar expand="lg" className={scrolled || expanded? "scrolled" : ""} onToggle={setToggle}  variant="dark">
          <Container>
              <Navbar.Brand href="/">
                <b>{t("logo")}</b>
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className='collapseItem'>
              <Nav className="ms-auto nav-right">
                <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{t("navbar-1")}</Nav.Link>
                <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>{t("navbar-2")}</Nav.Link>
                <Nav.Link href="#video" className={activeLink === 'movie' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('video')}>{t("navbar-3")}</Nav.Link>
                <Nav.Link href="#data" className={activeLink === 'data' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('data')}>{t("navbar-4")}</Nav.Link>
                <Nav.Link href="#quant" className={activeLink === 'quant' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('quant')}>{t("navbar-5")}</Nav.Link>
                <Nav.Link href="#news" className={activeLink === 'news' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('news')}>{t("navbar-6")}</Nav.Link>
              </Nav>
              <span className="navbar-text">
                <div className="social-icon d-none d-lg-block d-print-block">
                  <a href="https://discord.gg/JwzNrRCErY" target="_blank"><FaDiscord style={style}/></a>
                </div>
              </span>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Add/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
