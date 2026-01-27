import React from 'react'

export default function OrderCard({ product }) {
    const items = product?.items || []
    const primaryItem = items[0]
    const itemCount = items.length
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0)
    const totalAmount = product?.totalAmount ?? items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
    const orderStatus = product?.status || 'Pending'
    const orderDate = product?.orderDate ? new Date(product.orderDate).toLocaleDateString() : new Date().toLocaleDateString()
    const imageSrc = product?.image || primaryItem?.image || "/images/room1.png"
    const displayName = primaryItem?.productName
        ? `${primaryItem.productName}${itemCount > 1 ? ` +${itemCount - 1} more` : ''}`
        : 'Order Items'

    return (
        <div className="order-card">
            <div className="order-card-header">
                <div className="order-info">
                    <span className="order-id">Order #{product?._id ?? product?.id ?? 'N/A'}</span>
                    <span className="order-date">{orderDate}</span>
                </div>
                <span className={`order-card-status ${orderStatus.toLowerCase()}`}>
                    {orderStatus}
                </span>
            </div>

            <div className="order-card-body">
                <div className="order-card-image">
                    <img src={imageSrc} alt={displayName} />
                </div>

                <div className="order-card-details">
                    <h3 className='order-card-item-name'>{displayName}</h3>
                    <div className="order-meta">
                        <p className='order-card-item-quantity'>Qty: {totalQuantity || 1}</p>
                        <p className='order-card-item-price'>₹{totalAmount.toLocaleString()}</p>
                    </div>

                    {itemCount > 0 && (
                        <div className="order-card-items">
                            <h4>Items in this order ({itemCount}):</h4>
                            <ul>
                                {items.map((item, index) => (
                                    <li className='order-card-item' key={item.productId || index}>
                                        <div className="order-card-item-details">
                                            <span className="order-card-item-title">{item.productName}</span>
                                            {(item.material || item.color) && (
                                                <span className="order-card-item-meta">
                                                    {item.material || ''}{item.material && item.color ? ' • ' : ''}{item.color || ''}
                                                </span>
                                            )}
                                        </div>
                                        <span className="item-qty">x{item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="order-card-footer">
                <div className="order-card-total">
                    Total: ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="order-card-actions">
                    <button className="order-card-button view-details">View Details</button>
                    {orderStatus.toLowerCase() !== 'delivered' && orderStatus.toLowerCase() !== 'cancelled' && (
                        <button className="order-card-button cancel-order">Cancel Order</button>
                    )}
                </div>
            </div>
        </div>
    )
}
