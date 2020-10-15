import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useParams} from'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/loader';
import {LinkCard} from '../components/linkCard';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                autherization: `Bearer ${token}`
            });
            setLink(fetched);
        } catch (error) {
            
        }
    }, [token, linkId, request]);

    useEffect(() => {

    }, [getLink]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
};