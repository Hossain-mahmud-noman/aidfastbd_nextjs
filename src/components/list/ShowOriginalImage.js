import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ShowOriginalImage({ image, slug = "doctor" }) {
  const [dimensions, setDimensions] = useState({ "inline-size": 0, "block-size": 0 });
  useEffect(() => {
    const img = new window.Image();
    img.src = image;
    img.onload = () => {
      setDimensions({
        "inline-size": img.naturalWidth,
        "block-size": img.naturalHeight,
      });
    };
  }, []);

  return (
    <>
      {
        slug === "doctor" ? (
          <Image src={image} alt="Image" width={512} height={512} />
        ) : (
          <div className="w-full">
            {dimensions.width > 0 ? (
              <Image
                src={image}
                width={dimensions.width}
                height={dimensions.height}
                alt="Original size"
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
        )
      }
    </>
  );
}
