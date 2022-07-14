import React, { useState, useEffect, Component } from 'react'
import {NavLink} from "react-router-dom"

import app from "./../../firebase"
import { getDatabase, ref, child, get } from "firebase/database";


const Navigation = () => {
    const [menuItems, setMenuItems] = useState([])

    useEffect(()=> {
        const dbRef = ref(getDatabase(app));
            get(child(dbRef, `menu`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                setMenuItems(snapshot.val())
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
    },[])

    return (
        <>
            <div className="menu-container hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" htmlFor="menu__toggle">
                    <span></span>
                </label>
                <ul className="menu menu__box">
                    {menuItems.map(item => (
                    <li key={item.id}>
                        <NavLink exact="true" to={item.link} activeclassname="active" className="menuLink menu__item">{item.name}</NavLink>
                    </li>
                    )
                    )}
                </ul>
            </div>
        </>
    )
    
}

export default Navigation;
