import { Component } from "react";
import React from 'react';
import { Container } from "react-bootstrap";
import '../css/navBar.component.css'
import i18n from "../messages/i18n"
import logo from '../assets/logo.png';


class NavBar extends Component {

    logOut = () => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
        window.location.reload();
    };

    render() {
        return (
            <React.Fragment>
                {localStorage.getItem('access_token') !== '' ?
                    <Container className="menuContainer">
                        <nav className="navMenu">
                            <img className="advertLogo" src={logo} alt='logo' />
                            <a className="links" href="/">{i18n.t('navBar.home')}</a>
                            <a className="links" href="/user">{i18n.t('navBar.user')}</a>
                            <a className="links" href="/addAdvert">{i18n.t('navBar.advert')}</a>
                            <a className="links" href="/settings">{i18n.t('navBar.settings')}</a>
                            <button className="nav-logout" onClick={this.logOut}>{i18n.t('navBar.logout')}</button>
                        </nav>
                    </Container> :
                    <Container className="menuContainer">
                        <nav className="navMenu">
                        <img className="advertLogo" src={logo} alt='logo' />
                            <a className="nav-login" href="/login" >{i18n.t('navBar.login')}</a>
                        </nav>
                    </Container>
                }
            </React.Fragment>

        );
    }
}


export default NavBar;
