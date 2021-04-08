import React, { Component } from 'react'
import {NavLink} from "react-router-dom"

const MENU_URL = "http://localhost:3001/menu";

class Navigation extends Component {
    state = {
        menuItems: []
    } 

    componentDidMount() {
        fetch(MENU_URL)
        .then(res => {
            if (res.ok) {
                return res.json()
            }

            throw new Error("Błąd")
        } )
        .then(menuItems => this.setState( {menuItems} ))
    }

    render() {

        const { menuItems } = this.state;
        return (
            <ul>
                {menuItems.map(item => (
                <li key={item.id}>
                    <NavLink to={item.link} activeClassName="active">{item.name}</NavLink>
                </li>
                )
                )}
            </ul>
        )
    }
}

export default Navigation;
