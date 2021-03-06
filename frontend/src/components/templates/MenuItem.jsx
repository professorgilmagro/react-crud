import React from 'react'
import './MenuItem.css'
import { Link } from 'react-router-dom'

export default props =>
    <Link to={props.url}  className={props.active ? 'active' : ''}>
        <i className={`fa fa-${props.icon}`}></i> {props.text}
    </Link>