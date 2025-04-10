'use client';

import React from 'react'

function DiaLocation({lat,lon}) {
    return (<img onClick={() => {
        const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
        window.open(mapUrl, "_blank"); // Open in a new tab
    }}
        src='/icons/map.png' alt="Map Icon" width={30} height={30} />

    )
}

export default DiaLocation