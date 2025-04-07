
import React from 'react';

interface ProductImageGalleryProps {
  imageUrl: string | null;
  alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrl, alt }) => {
  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={alt} 
          className="w-full h-auto object-contain aspect-square"
        />
      ) : (
        <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-100 text-gray-400">
          Image non disponible
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
