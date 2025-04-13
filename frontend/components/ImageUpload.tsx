import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onImageUpload }: { onImageUpload: (url: string) => void }) => {
    const [image, setImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (!image) return;

        setUploading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", image);

            // Use the backend API URL for image upload
            const response = await axios.post("http://127.0.0.1:8000/upload-image", formData);
            onImageUpload(response.data.image_url);  // Pass the image URL back to the parent component
        } catch (err) {
            setError("Error uploading image");
            console.error('Error Uploading Image', err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!image || uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ImageUpload;
