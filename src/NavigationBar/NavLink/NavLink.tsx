/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FunctionComponent } from 'react';
import { Link } from "react-router-dom";
import { Ripple } from "@rmwc/ripple"
import { ThemeProvider } from "@rmwc/theme"

interface NavLinkProps {
    to: string,
    className: string,
    text: string,
    onClick: () => void
}

const NavLink: FunctionComponent<NavLinkProps> = ({ className, text, onClick, to }) => {
    return (
        <React.Fragment>
            <ThemeProvider
                options={{
                    primary: 'white',
                }}
            >
                <li className={className}>
                    <Link to={to}>
                        <Ripple primary unbounded>
                            <a onClick={onClick} className="nav-item">{text}</a>
                        </Ripple>
                    </Link>
                </li>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default NavLink;