import { Component } from "react";
import React from 'react';
import { Container } from "react-bootstrap";
import './navBar.component.css'
import i18n from "../messages/i18n"

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
                            <a href="/">{i18n.t('navBar.home')}</a>
                            <a href="/user">{i18n.t('navBar.user')}</a>
                            <a href="/addAdvert">{i18n.t('navBar.advert')}</a>
                            <a href="/settings">{i18n.t('navBar.settings')}</a>
                        </nav>
                        <button className="nav-login" onClick={this.logOut}>{i18n.t('navBar.logout')}</button>

                    </Container>
                    :
                    <Container className="menuContainer">
                        <nav className="navMenu">
                            <a className="nav-login" href="/login" >{i18n.t('navBar.login')}</a>
                        </nav>
                    </Container>
                }
            </React.Fragment>

        );
    }
}


export default NavBar;
