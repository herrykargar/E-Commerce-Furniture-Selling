import React from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from './RoomCard.jsx';

export default function BrowseByRoom({ rooms }) {
    const navigate = useNavigate();

    const handleSelectRoom = (room) => {
        const roomParam = encodeURIComponent(room.name);
        navigate(`/products?room=${roomParam}`);
    };

    return (
        <div className="browse-by-room">
            {rooms.map((room) => (
                <RoomCard key={room.id} room={{ name: room.name, imageUrl: room.image }} onSelect={handleSelectRoom} />
            ))}
        </div>
    )
}
