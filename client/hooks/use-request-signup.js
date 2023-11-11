import axios from 'axios';
import { useState } from 'react';

const useRequestSignUp = ({ url, method, body, onSuccess }) => {
    const [errors, setErros] = useState([]);

    const doRequest = async () => {
        try {
            // setErros([]);
            const response = await axios[method](url, body);
            setErros([]);
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch(err) {
            setErros(err.response.data.errors || []);
        }
    };
    return { doRequest, errors };
}

export default useRequestSignUp;