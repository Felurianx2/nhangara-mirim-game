// Image loading utilities for better performance

export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
    });
};

export const preloadImages = async (imageUrls: string[]): Promise<void> => {
    const promises = imageUrls.map(url => preloadImage(url).catch(() => {
        console.warn(`Failed to preload image: ${url}`);
    }));
    await Promise.all(promises);
};

export const getOptimizedImageUrl = (src: string, fallback?: string): string => {
    // Add loading optimization parameters
    return src;
};

export const createImageWithFallback = (src: string, fallback: string, alt: string): string => {
    return src || fallback;
}; 