import React from 'react'
import LogoutButton, { DeleteProfileButton } from '../../ui/LogoutButton'
import '../../assets/css/profile.css'

export default function Profile() {
    return (
        <>
            <div className="profile-container d-sm-flex ">
                <div className="profile-card w-100 w-sm-25">
                    <h2 className='text-center text-sm-start'>Tom Jerry</h2>
                    <div className="profile-picture d-flex justify-content-center justify-content-sm-start">
                        <img className='profile-image' src="data:image/jpeg;base64,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" alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <p><strong>Name:</strong> Tom Jerry</p>
                        <p><strong>Email:</strong> tom.bros@jerry.com</p>
                        <p><strong>Member Since:</strong> January 2022</p>
                        <p><strong>Address:</strong> Surat</p>
                        <p><strong>Mobile Number:</strong> 9748889466</p>
                    </div>
                    <div className="danger-zone d-none d-sm-flex">
                        <LogoutButton />
                        <DeleteProfileButton />
                    </div>
                </div>
                <div className="profile-actions w-100 w-sm-75 mt-sm-0 d-flex flex-column justify-content-center align-items-start">
                    <div className='profile-actions-items'>
                        <span>
                            Total Cart Items: 5
                        </span>
                        <button className="profile-action-button">Cart</button>
                    </div>
                    <div className='profile-actions-items'>
                        <span>
                            2 Orders Placed
                        </span>
                        <button className="profile-action-button">Orders</button>
                    </div>
                    <div className='profile-actions-items'>
                        <span>
                            3 Items in Wishlist
                        </span>
                        <button className="profile-action-button">Wishlist</button>
                    </div>
                </div>
                <div className="danger-zone d-flex d-sm-none">
                    <LogoutButton />
                    <DeleteProfileButton />
                </div>
            </div>
        </>
    )
}
