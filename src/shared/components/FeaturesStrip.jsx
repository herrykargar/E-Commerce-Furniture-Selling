import React from "react";

const defaultFeatures = [
  {
    icon: "fa-solid fa-award",
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: "fa-solid fa-truck-fast",
    title: "Free Shipping",
    description: "Order over  Rs 12,000",
  },
  {
    icon: "fa-solid fa-headset",
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

export default function FeaturesStrip({ items = defaultFeatures, className = "" }) {
  const classes = className ? `features-strip ${className}` : "features-strip";

  return (
    <div className={classes}>
      {items.map(({ icon, title, description }, idx) => (
        <div className="feature-item" key={`${title}-${idx}`}>
          <i className={icon} aria-hidden="true"></i>
          <div>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
