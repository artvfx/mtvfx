import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- ICONS ---
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

const TargetIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const CrosshairIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
    </svg>
);


// --- PRODUCT DATA ---
const products = [
  { name: 'Holoman', imageUrl: 'https://picsum.photos/seed/holoman/400/300' },
  { name: 'Miniholo', imageUrl: 'https://picsum.photos/seed/miniholo/400/300' },
  { name: 'Diamond', imageUrl: 'https://picsum.photos/seed/diamond/400/300' },
  { name: 'Piramide', imageUrl: 'https://picsum.photos/seed/piramide/400/300' },
  { name: 'Totem-holo', imageUrl: 'https://picsum.photos/seed/totemholo/400/300' },
  { name: 'Totem-Tronsparent', imageUrl: 'https://picsum.photos/seed/totemtransparent/400/300' },
];

const enhancementOptions = [
    'Night Scene',
    'Cinematic Lighting',
    'Change Camera Angle',
    'Add Reflections',
    'Photorealistic',
    'Minimalist Style'
];

type AspectRatio = '1:1' | '16:9' | '9:16';

const CreatePage: React.FC = () => {
    // --- STATE ---
    const [sceneImage, setSceneImage] = useState<File | null>(null);
    const [sceneImageUrl, setSceneImageUrl] = useState<string | null>(null);
    const [placement, setPlacement] = useState<{ x: number; y: number } | null>(null);
    const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [hologramContent, setHologramContent] = useState<File | null>(null);
    const [hologramContentUrl, setHologramContentUrl] = useState<string | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [brandImage, setBrandImage] = useState<File | null>(null);
    const [brandImageUrl, setBrandImageUrl] = useState<string | null>(null);
    const [selectedEnhancements, setSelectedEnhancements] = useState<string[]>([]);
    const [imageModification, setImageModification] = useState<'keep' | 'creative'>('keep');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const imageRef = useRef<HTMLImageElement>(null);


    // --- HANDLERS ---
    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fileSetter: React.Dispatch<React.SetStateAction<File | null>>,
        urlSetter: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            fileSetter(file);
            urlSetter(URL.createObjectURL(file));
             if (fileSetter === setSceneImage) {
                setPlacement(null); // Reset placement when scene changes
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setHoverPos({ x, y });
    };

    const handleMouseLeave = () => {
        setHoverPos(null);
    };
    
    const handlePlacementClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPlacement({ x, y });
        setHoverPos(null); // Hide mask after clicking
    };

    const toggleProduct = (productName: string) => {
        setSelectedProducts(prev =>
            prev.includes(productName)
                ? prev.filter(p => p !== productName)
                : [...prev, productName]
        );
    };
    
    const toggleEnhancement = (enhancement: string) => {
        setSelectedEnhancements(prev => 
            prev.includes(enhancement)
                ? prev.filter(e => e !== enhancement)
                : [...prev, enhancement]
        );
    };


    const fileToGenerativePart = async (file: File) => {
        const base64EncodedDataPromise = new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    const generateImage = async () => {
        if (!sceneImage || selectedProducts.length === 0) {
            setError('Please upload a scene image and select at least one product.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImageUrl(null);

        try {
            const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY });
            
            let prompt = `You are an expert photo editor. Your task is to integrate one or more holographic products into a user-provided background scene image.`;

            if (imageModification === 'keep') {
                prompt += `
ABSOLUTELY CRITICAL INSTRUCTION: Your primary and most important task is the **perfect preservation of the original background image**. You are acting as a precision photo editor, not a creative artist. The user-provided scene image MUST remain completely unchanged. The final output's background must be **pixel-for-pixel identical** to the input scene. Do not alter lighting, colors, textures, or any part of the background. Your only job is to add the requested holographic elements ON TOP of this unaltered background. This is a non-negotiable rule that overrides all other instructions.`;
            } else {
                 prompt += `
IMPORTANT: You have creative freedom to moderately alter the background scene to better match the requested enhancements (e.g., changing lighting to create a night scene), but the overall composition and key elements of the original scene must remain recognizable.`;
            }

            prompt += `

Here are the details for the integration:
1.  **Product(s) to add:** Place the following holographic device(s) into the scene: ${selectedProducts.join(', ')}.`;

            if (placement) {
                 prompt += `
2.  **Placement:** The user has indicated a preferred placement location at approximately ${placement.x.toFixed(0)}% from the left and ${placement.y.toFixed(0)}% from the top of the image. Use this as the primary location for the device(s).`;
            }

            if (hologramContent) {
                 prompt += `
3.  **Hologram Content:** The holographic device(s) should be projecting a glowing, high-fidelity hologram of the 'hologram content' image provided.`;
            } else {
                 prompt += `
3.  **Hologram Content:** The holographic device(s) should be projecting a visually stunning, abstract, glowing light formation. The color and style should complement the scene's ambiance.`;
            }

            if (logo) {
                prompt += `
4.  **Branding:** A company logo is provided. Subtly incorporate this logo onto the body of the holographic device(s). It should look like premium, integrated product branding, not a sticker.`
            }
            if (brandImage) {
                prompt += `
5.  **Style Guide:** A brand image/style guide is provided. Use the color palette, style, and aesthetic from this image to influence the design of the device itself and the colors of the holographic projection. The product should feel like it belongs to this brand.`
            }
            if (selectedEnhancements.length > 0) {
                prompt += `
6.  **User Enhancements:** The user has selected these specific enhancements, which you must prioritize: "${selectedEnhancements.join(', ')}".`;
            }
             prompt += `
7. **Aspect Ratio:** The final output image MUST have an aspect ratio of ${aspectRatio}. This is a mandatory requirement.`

            prompt += `
**Final Output Requirements:**
- The final image must be photorealistic.
- The added holographic device(s) and their projections must have realistic lighting, casting appropriate shadows and creating reflections on surfaces within the original scene to look seamlessly integrated.
- **Aspect Ratio (Mandatory):** The final image must strictly adhere to the requested ${aspectRatio} aspect ratio.
- **Preservation of Background (Non-Negotiable):** Re-confirming the most critical rule: if 'Don't Change Original Image' was selected, the background MUST be identical to the original. There are no exceptions.`;
            
            const contents: any[] = [{ text: prompt }, await fileToGenerativePart(sceneImage)];

            if (hologramContent) contents.push(await fileToGenerativePart(hologramContent));
            if (logo) contents.push(await fileToGenerativePart(logo));
            if (brandImage) contents.push(await fileToGenerativePart(brandImage));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: contents },
                config: {
                    responseModalities: ["IMAGE", "TEXT"],
                },
            });
            
            let hasImage = false;
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                setGeneratedImageUrl(imageUrl);
                hasImage = true;
                break;
              }
            }

            if (!hasImage) {
                throw new Error("The AI did not return an image. It might have refused the request.");
            }

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`An error occurred while generating the image. Please try again. Details: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };


    // --- RENDER ---
    const renderUploadBox = (
        title: string,
        fileUrl: string | null,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        id: string
    ) => (
        <div className="flex-1 min-w-[200px]">
            <label htmlFor={id} className="cursor-pointer block bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                {fileUrl ? (
                    <img src={fileUrl} alt={title} className="max-h-32 mx-auto rounded-md" />
                ) : (
                    <div className="flex flex-col items-center">
                        <UploadIcon className="w-10 h-10 text-gray-500 mb-2" />
                        <span className="text-gray-400">{title}</span>
                    </div>
                )}
            </label>
            <input id={id} type="file" className="hidden" accept="image/*" onChange={onChange} />
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-24 bg-black text-white">
            <div className="container mx-auto px-6">

                {/* --- HEADER --- */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Create Your Product
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Follow the steps below to generate a unique holographic product visualization.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    
                    {/* --- STEP 1: SCENE --- */}
                    <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                         <h2 className="flex items-center text-2xl font-bold mb-4">
                            <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-4 text-white font-bold">1</span>
                            Upload Your Scene & Choose Placement
                        </h2>
                        <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                            {!sceneImageUrl ? (
                                <label htmlFor="scene-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center py-10">
                                        <UploadIcon className="w-12 h-12 text-gray-500 mb-4" />
                                        <span className="text-gray-400 font-semibold">Click to upload your background image</span>
                                        <span className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                                    </div>
                                </label>
                            ) : (
                                <div className="relative inline-block">
                                     <div
                                        className="relative rounded-md overflow-hidden cursor-crosshair"
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handlePlacementClick}
                                    >
                                        <img 
                                            ref={imageRef} 
                                            src={sceneImageUrl} 
                                            alt="Uploaded scene" 
                                            className="max-h-96 mx-auto pointer-events-none" 
                                        />
                                        {hoverPos && (
                                            <div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(circle 100px at ${hoverPos.x}% ${hoverPos.y}%, transparent 99px, rgba(0,0,0,0.6) 100px)`,
                                                }}
                                            >
                                                <CrosshairIcon 
                                                    className="absolute w-8 h-8 text-white/70 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                                                    style={{ left: `${hoverPos.x}%`, top: `${hoverPos.y}%` }}
                                                />
                                            </div>
                                        )}
                                        {placement && (
                                            <TargetIcon
                                                className="absolute w-8 h-8 text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                                                style={{ left: `${placement.x}%`, top: `${placement.y}%` }}
                                            />
                                        )}
                                    </div>
                                    <p className="mt-2 text-sm text-gray-400">
                                        Hover and click on the image to set product placement. 
                                        <label htmlFor="scene-upload" className="text-blue-400 hover:underline cursor-pointer ml-1">Change image.</label>
                                    </p>
                                </div>
                            )}
                        </div>
                        <input id="scene-upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setSceneImage, setSceneImageUrl)} />
                    </div>

                    {/* --- STEP 2: PRODUCT --- */}
                    <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                        <h2 className="flex items-center text-2xl font-bold mb-1">
                             <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-4 text-white font-bold">2</span>
                            Add a Product
                        </h2>
                         <p className="text-sm text-red-400 ml-14 mb-4">At least one product must be selected.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {products.map(product => (
                                <div
                                    key={product.name}
                                    onClick={() => toggleProduct(product.name)}
                                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 transform hover:scale-105 ${selectedProducts.includes(product.name) ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700 hover:border-gray-500'}`}
                                >
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
                                    <p className="p-2 text-center bg-gray-800 text-sm font-medium">{product.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* --- STEP 3: ASSETS --- */}
                     <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                        <h2 className="flex items-center text-2xl font-bold mb-1">
                             <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-4 text-white font-bold">3</span>
                             Add Content & Brand Assets (Optional)
                        </h2>
                        <p className="text-sm text-gray-400 ml-14 mb-4">Upload content for the hologram, your logo, and a brand style image.</p>
                        <div className="flex flex-wrap gap-4">
                            {renderUploadBox('Upload Hologram Content', hologramContentUrl, (e) => handleFileChange(e, setHologramContent, setHologramContentUrl), 'hologram-upload')}
                            {renderUploadBox('Upload Company Logo', logoUrl, (e) => handleFileChange(e, setLogo, setLogoUrl), 'logo-upload')}
                            {renderUploadBox('Upload Brand Image', brandImageUrl, (e) => handleFileChange(e, setBrandImage, setBrandImageUrl), 'brand-image-upload')}
                        </div>
                    </div>


                    {/* --- STEP 4: ENHANCEMENTS --- */}
                    <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                        <h2 className="flex items-center text-2xl font-bold mb-6">
                            <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-4 text-white font-bold">4</span>
                            Add Enhancements (Optional)
                        </h2>
                        <div className="space-y-6">
                             <div>
                                <h3 className="text-lg font-semibold text-gray-300 mb-3">Output Aspect Ratio</h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {(['1:1', '16:9', '9:16'] as const).map(ratio => (
                                        <button
                                            key={ratio}
                                            onClick={() => setAspectRatio(ratio)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 w-full ${aspectRatio === ratio ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-800 hover:bg-gray-700'}`}
                                        >
                                            {ratio === '1:1' && 'Square (1:1)'}
                                            {ratio === '16:9' && 'Landscape (16:9)'}
                                            {ratio === '9:16' && 'Portrait (9:16)'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300 mb-3">Image Integrity</h3>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setImageModification('keep')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 w-full ${imageModification === 'keep' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                        Don't Change Original Image
                                    </button>
                                    <button 
                                        onClick={() => setImageModification('creative')}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 w-full ${imageModification === 'creative' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-800 hover:bg-gray-700'}`}>
                                        Allow Creative Changes
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300 mb-3">Visual Style Enhancements</h3>
                                <div className="flex flex-wrap gap-3">
                                    {enhancementOptions.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => toggleEnhancement(option)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selectedEnhancements.includes(option) ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-800 hover:bg-gray-700'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- STEP 5: GENERATE --- */}
                    <div className="text-center">
                        <button
                            onClick={generateImage}
                            disabled={isLoading || !sceneImage || selectedProducts.length === 0}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </div>
                            ) : 'Generate Image'}
                        </button>
                    </div>

                    {/* --- RESULT --- */}
                    {(error || generatedImageUrl || isLoading) && (
                        <div className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800">
                            <h2 className="text-2xl font-bold mb-4">Result</h2>
                             {isLoading && (
                                <div className="flex flex-col items-center justify-center text-center p-8">
                                    <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-lg">Your image is being generated...</p>
                                    <p className="text-sm text-gray-400">This may take a moment.</p>
                                </div>
                            )}
                            {error && !isLoading && (
                                <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
                                    <p className="font-bold">An error occurred:</p>
                                    <p>{error}</p>
                                </div>
                            )}
                            {generatedImageUrl && !isLoading && (
                                <div className="mt-4">
                                    <img src={generatedImageUrl} alt="Generated holographic product" className="rounded-lg mx-auto shadow-2xl shadow-blue-500/20" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
