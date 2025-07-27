'use client';
import Image from 'next/image';
import React from 'react'
function DiaLocation({ lat, lon }) {
    return (<Image className='cursor-pointer' onClick={() => {
        const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
        window.open(mapUrl, "_blank"); // Open in a new tab
    }}
        src='/icons/map.png' alt="Map Icon" width={30} height={30} />

    )
}

export default DiaLocation