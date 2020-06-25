/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FunctionComponent } from 'react';
import { Link } from "react-router-dom";
import { Ripple } from "@rmwc/ripple"
import { ThemeProvider } from "@rmwc/theme"
import {INavLink} from './NavLink';

export const NavLink: FunctionComponent<INavLink.IProps> = ({ className, text, onClick, to }) => {
    return (
        <React.Fragment>
            <ThemeProvider
                options={{
                    primary: 'white',
                }}
            >
                <li className={className}>
                    <Link to={to}>
                        <Ripple primary>
                            <div style={{marginTop: '-2.1rem', paddingTop: '2.1rem', paddingBottom: '2.1rem', marginBottom: '-2.1rem'}}>
                                <a onClick={onClick} className="nav-item">{text}</a>
                            </div>
                        </Ripple>
                    </Link>
                </li>
            </ThemeProvider>
        </React.Fragment>
    );
}