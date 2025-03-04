import { use } from "react"
import { UserContext } from "../Context/UserContext"

export default function Profile() {

    const contextUser = use(UserContext)

    const { user, setUser, profile } = contextUser
    console.log(profile)


    return (
        <div>

            <ul>
                <li> {profile.email} </li>
                <li> {profile.nombre} </li>
                <li></li>

            </ul>


        </div>
    )
}
