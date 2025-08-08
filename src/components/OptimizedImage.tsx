import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    onLoad?: () => void;
    onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    fallbackSrc,
    onLoad,
    onError
}) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImageSrc(src);
        setIsLoading(true);
        setHasError(false);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    const handleError = () => {
        if (fallbackSrc && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(false);
        } else {
            setIsLoading(false);
            setHasError(true);
            onError?.();
        }
    };

    if (hasError) {
        return (
            <div className={`bg-gray-600 flex items-center justify-center ${className}`}>
                <span className="text-gray-400 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-600 animate-pulse flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={imageSrc}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
            />
        </div>
    );
};

export default OptimizedImage; 