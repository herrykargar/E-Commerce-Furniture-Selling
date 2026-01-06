import React from 'react'

export default function Button({ children, type = "button", disabled = false }) {
    return (
        <div className="button-container">
            <button type={type} disabled={disabled}>
                {children}
            </button>
        </div>
    )
}
