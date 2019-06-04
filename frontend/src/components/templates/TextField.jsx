import React from 'react'
import './MenuItem.css'
import { Link } from 'react-router-dom'

export default props =>
    <div className={`col-${props.col} col-md-${props.colMd}`}>
        <div className="form-group">
            <label>{props.label}</label>
            <input
                type={props.type || 'text'}
                name={props.name}
                id={props.id}
                value={this.state.user.name}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="form-control" />
        </div>
    </div>