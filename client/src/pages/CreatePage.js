import React, {useEffect, useState, useContetxt} from 'react';
import {useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';

export const CreatePage = () => {
    const history = useHistory();
    const auth = useContetxt(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const pressHandler =  async (e) => {
        if (e.key === 'ENTER') {
            try {
                const data =await request('/api/link/generate', 'POST', {from: link}, {
                    Autherization: `Bearer ${auth.token}`
                })
                history.push(`/detali/${data.link._id}`);
            } catch(e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
                <input 
                    placeholder="Put link" 
                    id="link" 
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={pressHandler}
                />
                <label htmlFor="link">Emter link</label>
            </div>
            </div>
        </div>
    )
};