
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from 'firebase/firestore'

export const useFetchDocs = (userId, docName) => {

    const [loading, setLoading] = useState(false);
    const [doc, setDoc] = useState([])

    useEffect(() => {
        const fetchDocs = async () => {
            setLoading(true)

            const querySnapshot = await getDocs(collection(db, 'users', userId, docName))
            const docList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            docList.sort((a, b) => b.createdAt - a.createdAt)
            setDoc(docList)
            setLoading(false)
        }

        fetchDocs()
    }, [userId, docName])

    return {
        loading,
        doc,
    }

}