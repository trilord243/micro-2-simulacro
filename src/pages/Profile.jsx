import { useState } from 'react';
import { uploadImage } from '../../supabseCredentials';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../../credentials';
import { getAuth } from 'firebase/auth';
import { use } from 'react';
import { UserContext } from '../Context/UserContext';


const db = getFirestore(app)
const auth = getAuth(app)


export default function Profile() {

    const [isUploading, setIsUploading] = useState(false);
    const { profile, setProfile } = use(UserContext);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {

            setIsUploading(true);
            //El usuario actual
            const user = auth.currentUser;

            //Subir la imagen a supabase con bucket de nombre foto-perfil y uid del usuario
            const imageUrl = await uploadImage(file, 'foto-perfil', user.uid);


            //actualizar en firebase


            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                foto_perfil: imageUrl
            })


            //actualizar el estado local
            setProfile({
                ...profile,
                foto_perfil: imageUrl
            })

        } catch (error) {
            alert('Error al subir la imagen');

        } finally {
            setIsUploading(false);
        }



    }

    return (
        <div className="container mx-auto p-4">


            <h1>Mi Perfil</h1>





            <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"


            />

            {isUploading && <p className="mt-2 text-blue-600">Subiendo imagen...</p>}


        </div>
    )
}
