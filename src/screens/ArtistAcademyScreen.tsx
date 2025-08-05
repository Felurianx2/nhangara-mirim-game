import React, { useState } from 'react';
import { Upload, Feather, CheckCircle, Loader } from 'lucide-react';

const ArtistAcademyScreen: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [artName, setArtName] = useState('');
    const [artStory, setArtStory] = useState('');
    const [isMinting, setIsMinting] = useState(false);
    const [isMinted, setIsMinted] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imagePreview || !artName || !artStory) {
            alert('Please fill all fields and upload an image.');
            return;
        }
        setIsMinting(true);
        // Simulate backend call to mint NFT
        setTimeout(() => {
            setIsMinting(false);
            setIsMinted(true);
        }, 2500);
    };
    
    if (isMinted) {
        return (
            <div className="max-w-2xl mx-auto text-center animate-fadeIn p-8 bg-gray-800 rounded-xl">
                 <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
                <h2 className="text-3xl font-bold text-white">Art Minted Successfully!</h2>
                <p className="text-gray-300 mt-2 mb-6">Your cultural artwork is now a digital treasure on the Hedera network (Testnet). It will be listed in the "Brazilian Roots Marketplace".</p>
                <button 
                    onClick={() => {
                        setIsMinted(false);
                        setImagePreview(null);
                        setArtName('');
                        setArtStory('');
                    }}
                    className="mt-4 bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    Create Another Artwork
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Digital Roots Academy</h1>
                <p className="text-lg text-gray-400 mt-2">Transform your art and culture into an eternal digital asset.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                {/* Image Upload */}
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="art-upload" className="w-full h-80 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-gray-700/50 transition-colors">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview da arte" className="w-full h-full object-contain rounded-lg p-2" />
                        ) : (
                            <div className="text-center text-gray-400">
                                <Upload size={48} className="mx-auto mb-2" />
                                <span className="font-semibold">Click to upload your image</span>
                                <p className="text-sm">PNG, JPG, GIF</p>
                            </div>
                        )}
                    </label>
                    <input id="art-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/gif" onChange={handleImageChange} />
                </div>
                
                {/* Form Fields */}
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="artName" className="block text-sm font-medium text-gray-300 mb-2">Art Name</label>
                        <input
                            type="text"
                            id="artName"
                            value={artName}
                            onChange={(e) => setArtName(e.target.value)}
                            className="w-full bg-gray-700 border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="E.g., Protector's Glyphs"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="artStory" className="block text-sm font-medium text-gray-300 mb-2">Art's Story</label>
                        <textarea
                            id="artStory"
                            rows={6}
                            value={artStory}
                            onChange={(e) => setArtStory(e.target.value)}
                            className="w-full bg-gray-700 border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Tell the story, meaning, or inspiration behind your creation..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isMinting}
                        className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-wait"
                    >
                        {isMinting ? (
                            <>
                                <Loader className="animate-spin" />
                                <span>Minting on Testnet...</span>
                            </>
                        ) : (
                            <>
                                <Feather />
                                <span>Mint Your Art</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArtistAcademyScreen;