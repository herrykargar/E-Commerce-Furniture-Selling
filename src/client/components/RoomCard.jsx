import React from 'react'

export default function RoomCard({ room, onSelect }) {
  const handleActivate = () => onSelect?.(room);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <div
      className="room-card"
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
    >
      <img src={room.imageUrl} alt={room.name} loading="lazy" />
      <h4>{room.name}</h4>
    </div>
  )
}
