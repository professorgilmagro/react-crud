import "./Nav.css"
import React from 'react'
import MenuItem from '../templates/MenuItem'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <MenuItem url="/" icon="home" text="Início" active={console.log(props)} />
            <MenuItem url="/users/list" icon="users" text="Usuários"/>
        </nav>
    </aside>