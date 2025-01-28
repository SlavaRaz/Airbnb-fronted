import logo from '../assets/img/various/airbnb.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

export function AppHeaderBook() {

    return (

        <div className={"app-header-book full main-container"}>
            <div className="header-logo">
                <NavLink to="/" >
                    <img src={logo} alt="Logo" />
                </NavLink>
                <NavLink to="/" >
                    <h2 className="logo-text">airbnb</h2>
                </NavLink>
            </div>
        </div>
    )
}
