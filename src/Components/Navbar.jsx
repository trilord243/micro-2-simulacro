import React, { use } from 'react'
import { Link, Outlet } from 'react-router'
import { UserContext } from '../Context/UserContext'
import { app } from '../../credentials'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(app)

export default function Navbar() {


    const estiloNavbar = 'text-xl text-white font-bold hover:text-red-500'

    const profileContext = use(UserContext)


    const { logged, profile } = profileContext

    console.log(profile.tipo)


    const esDirectora = profile.tipo === 'directora'





    const handleLogout = async () => {

        await signOut(auth)
    }


    return (
        <>




            <nav className=''>

                <ul className='flex bg-blue-800 justify-around py-8'>
                    <li>
                        <Link to='/' className={estiloNavbar}  > Home</Link>
                    </li>
                    <li>


                        {logged && <Link to='/profile' className={estiloNavbar} >Profile</Link>}
                    </li>


                    {esDirectora && <li>1</li>}
                    {!esDirectora && <li>2</li>}

                    <li>


                        <div className='flex gap-6 items-center'>
                            {logged ?

                                <>
                                    <div className="flex items-center gap-3">
                                        {/* Foto de perfil */}
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                            {profile.foto_perfil ? (
                                                <img
                                                    src={profile.foto_perfil}
                                                    alt="Foto de perfil"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400 text-xs">Sin foto</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-white">{profile.nombre}</div>
                                            <div className="text-gray-300 text-xs">{profile.email}</div>
                                        </div>
                                    </div>

                                    <button className='bg-white w-20 h-10 cursor-pointer rounded-md hover:bg-gray-100' onClick={handleLogout}>Logout</button>

                                </> :
                                <>


                                    <Link className={estiloNavbar} to='/login'> Login</Link>
                                    <Link className={estiloNavbar} to='/register'> Register</Link>
                                </>





                            }

                        </div>
                    </li>




                </ul>

            </nav >

            <Outlet />

        </>)
}
