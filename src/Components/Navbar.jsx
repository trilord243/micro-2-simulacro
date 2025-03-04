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

                    <li>


                        <div className='flex gap-6'>
                            {logged ?

                                <>
                                    {profile.email}
                                    {profile.nombre}

                                    <button className='bg-white w-20 h-10 cursor-pointer' onClick={handleLogout}>Logout</button>

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
