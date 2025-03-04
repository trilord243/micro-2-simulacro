import React, { useState } from 'react'


import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../credentials'
import { Link, useNavigate } from 'react-router'


const auth = getAuth(app)

export default function Login() {
    const navigation = useNavigate()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {

            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user.user.uid)
            console.log(user.user.email)
            navigation('/')

        } catch (error) {
            console.log(error.message)
            if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                setError('Credenciales invalidas')
            }

        }

    }

    return (<>



        <div className='w-screen h-screen  flex justify-center items-center  bg-blue-50'>
            <form onSubmit={handleLogin} className='flex flex-col  w-lg h-1/2 justify-center items-center gap-5 rounded-2xl shadow-2xl border-0.5 bg-white '>
                {error && <div className='text-red-500'>{error}</div>}
                <h1 className=' mb-10 text-4xl font-bold italic'>Login </h1>
                <Link className='text-xl text-blue-400' to='/register'>Si no tienes usuario registrate </Link>
                <label className='text-xl '>
                    Email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className=' rounded-md border-0 py-1.5  text-gray-900
                    
                    shadow-sm ring ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ' type="email" name="email" />
                </label>
                <label className='text-xl '>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className=' border-1 ml-1 rounded-2xl' type="password" name="password" />
                </label>
                <button className='bg-blue-600 py-3 px-4 text-3xl rounded-2xl cursor-pointer ' type="submit">Login</button>


            </form>



        </div>
    </>
    )
}
