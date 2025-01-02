import React, { useState } from "react";
import BlogCard from "./blogCard";

export function BlogCards({ cards }) {
    const [hovered, setHovered] = useState(null);

    return (
        <>
            {cards.map((card, index) => (
                <BlogCard
                    key={card.title}
                    card={card}
                    index={index + 1}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </>
    );
}
