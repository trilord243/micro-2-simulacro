

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../credentials";
import { useState } from "react";
import { Link, useNavigate } from "react-router";



const db = getFirestore(app)
const auth = getAuth(app);

export default function Register() {

    const navigation = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, seteEror] = useState('')

    const handleRegister = async (e) => {



        e.preventDefault()

        try {
            setLoading(true)
            const nombreRegistradp = await createUserWithEmailAndPassword(auth, email, password)

            console.log(nombreRegistradp.user.email)

            await setDoc(doc(db, 'users', nombreRegistradp.user.uid), {
                nombre: name,
                email: email,
                uid: nombreRegistradp.user.uid,
                fechaCreacion: new Date()
            })
            setEmail('')
            setPassword('')
            setName('')
            setLoading(false)
            navigation('/')


        } catch (error) {
            setLoading(false)


            console.log(error)
            seteEror(error.message)

            if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                seteEror('El correo ya esta en uso')
            }


        }









    }

    return (

        <div className='w-screen h-screen  flex justify-center items-center  bg-blue-50'>
            {loading && <div className=''>Cargando....</div>}
            {error && <div className='text-red-500'>{error}</div>}




            <form onSubmit={handleRegister} className='flex flex-col  w-lg h-1/2 justify-center items-center gap-5 rounded-2xl shadow-2xl border-0.5 bg-white '>
                <h1 className=' mb-10 text-4xl font-bold italic'>Register </h1>
                <Link className="text-blue-300" to='/login'>Si ya tienes usuario as login 🙈</Link>
                <label className='text-xl '>
                    Email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className=' border-1 ml-1 rounded-2xl' type="email" name="email" />
                </label>
                <label className='text-xl '>
                    Nombre:
                    <input value={name} onChange={(e) => setName(e.target.value)} className=' border-1 ml-1 rounded-2xl' type="text" name="name" />
                </label>
                <label className='text-xl '>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className=' border-1 ml-1 rounded-2xl' type="password" name="password" />
                </label>
                <button className='bg-blue-600 py-3 px-4 text-3xl rounded-2xl cursor-pointer ' type="submit">Login</button>


            </form>



        </div>
    )
}
