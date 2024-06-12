import { db } from '../firebase/config'

import {
    getAuth,
    updateProfile
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useUpdate = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkIsCancelled() { if (cancelled) return }

    //update displayName
    const updateDisplayName = async (displayName) => {
        checkIsCancelled()
        setLoading(true)
        setError(false)

        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName })
                setLoading(false)
                return user
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    //update phoneNumber
    const updatePhoneNumber = async () => {
        checkIsCancelled()
        setLoading(true)
        setError(false)

        try {
            const user = auth.currentUser
            if (user) {

            }
        } catch (error) {

        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        updateDisplayName,
        loading,
        error
    }
}