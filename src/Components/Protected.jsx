import React, { use, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { UserContext } from '../Context/UserContext'

export default function Protected() {
    const navigate = useNavigate()


    const profileCOntext = use(UserContext)

    const { logged } = profileCOntext


    useEffect(() => {
        if (!logged) {
            navigate('/login')
        }


    }, [logged, navigate])



    return (
        <Outlet />
    )
}
