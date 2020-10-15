import { request } from 'express';
import React, {useState, useContext} from 'react';
import { Loader } from '../components/loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {LinksPage} from '../components/linksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useHttp();
    const {token} = useContext(AuthContext);

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Autherization: `Bearer ${token}`
            });
            setLinks(fetched);
        } catch (e) {
            
        }
    }, [token, request]);

    useEffect( () => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <linksList links={links} />}
        </>
    )
};