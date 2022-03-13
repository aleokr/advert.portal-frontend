import React from 'react';
import { Container } from "react-bootstrap";
import '../css/navBar.component.css'
import i18n from "../messages/i18n"
import logo from '../assets/logo.png';
import pl_icon from '../assets/pl.png';
import en_icon from '../assets/eng.png';
import { RouteComponentProps, withRouter } from "react-router-dom";


class NavBar extends React.Component<RouteComponentProps> {

    changeLanguage = (value: string) => {
        i18n.changeLanguage(value);
    };

    logOut = () => {
        localStorage.setItem('access_token', '');
        localStorage.setItem('refresh_token', '');
        this.props.history.push('/');
    };


    render() {
        return (
            <React.Fragment>
                {localStorage.getItem('access_token') !== '' && localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null &&
                    <Container className="menu-container">
                        <nav className="nav-menu">
                            <img className="advert-logo" src={logo} alt='logo' />
                            <img className="icon" src={pl_icon} alt='pl_icon' onClick={() => this.changeLanguage('pl')} />
                            <img className="icon" src={en_icon} alt='en_icon' onClick={() => this.changeLanguage('en')} />
                            <a className="disable-link" href="/">{i18n.t('navBar.home')}</a>
                            <a className="disable-link" href="/userPanel">{i18n.t('navBar.user')}</a>
                            <a className="disable-link" href="/addAdvert">{i18n.t('navBar.advert')}</a>
                            <a className="disable-link" href="/settings">{i18n.t('navBar.settings')}</a>
                            <button className="nav-logout" onClick={this.logOut}>{i18n.t('navBar.logout')}</button>
                        </nav>
                    </Container>}
                {localStorage.getItem('access_token') !== '' && !(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) &&
                    <Container className="menu-container">
                        <nav className="nav-menu">
                            <img className="advert-logo" src={logo} alt='logo' />
                            <img className="icon" src={pl_icon} alt='pl_icon' onClick={() => this.changeLanguage('pl')} />
                            <img className="icon" src={en_icon} alt='en_icon' onClick={() => this.changeLanguage('en')} />
                            <a className="links" href="/">{i18n.t('navBar.home')}</a>
                            <a className="links" href="/userPanel">{i18n.t('navBar.user')}</a>
                            <a className="links" href="/addAdvert">{i18n.t('navBar.advert')}</a>
                            <a className="links" href="/settings">{i18n.t('navBar.settings')}</a>
                            <button className="nav-logout" onClick={this.logOut}>{i18n.t('navBar.logout')}</button>
                        </nav>
                    </Container>}
                {localStorage.getItem('access_token') === '' &&
                    <Container className="menu-container">
                        <nav className="nav-menu">
                            <img className="advert-logo" src={logo} alt='logo' />
                            <img className="icon" src={pl_icon} alt='pl_icon' onClick={() => this.changeLanguage('pl')} />
                            <img className="icon" src={en_icon} alt='en_icon' onClick={() => this.changeLanguage('en')} />
                            <a className="links" href="/">{i18n.t('navBar.home')}</a>
                            <a className="nav-login" href="/login" >{i18n.t('navBar.login')}</a>
                        </nav>
                    </Container>
                }

            </React.Fragment>
        );
    }
}

export default withRouter(NavBar);
