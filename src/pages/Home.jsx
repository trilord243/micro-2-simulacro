import React, { use } from 'react'
import Navbar from '../Components/Navbar'
import { UserContext } from '../Context/UserContext'
import BotonPaypal from '../Components/BotonPaypal'


function Home() {

    const contextuser = use(UserContext)

    const { user, setUser } = contextuser



    return (

        <>


            <button className='cursor-pointer  ' onClick={() => setUser('pablo ')}> Hazme click  </button>
            <p>Hola {user}</p>
            <div>Home</div>
            <BotonPaypal />
        </>
    )
}


export default Home 