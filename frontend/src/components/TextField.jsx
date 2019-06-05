import React from 'react'

export default props =>
    <div className={props.class}>
        <div className="form-group">
            <label>{props.label}</label>
            <input
                type={props.type || 'text'}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                className="form-control" />
        </div>
    </div>