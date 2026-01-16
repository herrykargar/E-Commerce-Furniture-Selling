import React, { useState } from 'react'
export default function QtyPicker({ qty, inc, dec }) {
    return (
        <div className="qty-picker">
            <button type="button" onClick={dec} aria-label="Decrease quantity">-</button>
            <span>{qty}</span>
            <button type="button" onClick={inc} aria-label="Increase quantity">+</button>
        </div>
    )
}
