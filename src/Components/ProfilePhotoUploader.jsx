import { useState } from 'react';
import { uploadImage } from '../config/supabaseConfig';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../../credentials';
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { UserContext } from '../Context/UserContext';

const db = getFirestore(app);
const auth = getAuth(app);

export default function ProfilePhotoUploader() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const userContext = use(UserContext);
    const { profile, setProfile } = userContext;

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && !file.type.startsWith('image/')) {
            setUploadError('Por favor selecciona un archivo de imagen válido');
            return;
        }

        if (file && file.size > 2 * 1024 * 1024) {
            setUploadError('La imagen no debe superar los 2MB');
            return;
        }

        setUploadError(null);
        setUploadSuccess(false);
        setSelectedFile(file);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Por favor selecciona una imagen primero');
            return;
        }

        try {
            setIsUploading(true);
            setUploadError(null);

            const user = auth.currentUser;
            if (!user) {
                throw new Error('Debes iniciar sesión para subir una foto de perfil');
            }

            const imageUrl = await uploadImage(selectedFile, 'profile-photos', user.uid);

            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                foto_perfil: imageUrl
            });

            setProfile({
                ...profile,
                foto_perfil: imageUrl
            });

            setUploadSuccess(true);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setUploadError(error.message || 'Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Foto de Perfil</h2>

            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                {previewUrl ? (
                    <img src={previewUrl} alt="Vista previa" className="w-full h-full object-cover" />
                ) : profile.foto_perfil ? (
                    <img src={profile.foto_perfil} alt="Foto de perfil" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-400">Sin foto</span>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded-md ${!selectedFile || isUploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
            >
                {isUploading ? 'Subiendo...' : 'Subir Foto'}
            </button>

            {uploadError && (
                <p className="text-red-500 mt-2">{uploadError}</p>
            )}

            {uploadSuccess && (
                <p className="text-green-500 mt-2">¡Foto de perfil actualizada con éxito!</p>
            )}
        </div>
    );
}