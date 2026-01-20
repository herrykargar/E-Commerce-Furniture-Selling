import React from 'react'

export default function Button({ children, type = 'button' }) {
    return (
        <div className="insp-cta">
            <button className="btn-primary" type={type}>{children}</button>
        </div>
    )
}
