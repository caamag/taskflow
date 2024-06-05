import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkIsCancelled() { if (cancelled) return }

    //create new user
    const createUser = async (data) => {
        checkIsCancelled()
        setLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.pass
            )

            await updateProfile(user, {
                displayName: data.name
            })
            setLoading(false)
            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemError = ''
            if (error.message.includes("Passwords")) {
                systemError = 'A senha precisa ter pelo menos seis caracteres'
            } else if (error.message.includes("email-already")) {
                systemError = 'Email já cadastrado'
            } else {
                systemError = 'Ocorreu um erro! tente novamente mais tarde.'
            }
            setError(systemError)
            setLoading(false)
        }
    }

    //logout
    const logout = () => {
        checkIsCancelled()
        signOut(auth)
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        logout,
        error,
        loading
    }
}