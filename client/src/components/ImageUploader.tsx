import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange?: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  initialImage = "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  onImageChange,
  className = ""
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImage(imageUrl);
        if (onImageChange) {
          onImageChange(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className={`relative cursor-pointer overflow-hidden ${className}`}
      onClick={handleImageClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <img 
        src={image} 
        alt="Personal photo" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-sm font-medium px-3 py-1 bg-primary rounded-md">
          Change Photo
        </span>
      </div>
    </div>
  );
};

export default ImageUploader;