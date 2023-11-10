import axios from 'axios';
import { useState } from 'react';

const useRequestSignUp = ({ url, method, body }) => {
    const [errors, setErros] = useState([]);

    const doRequest = async () => {
        try {
            // setErros([]);
            const response = await axios[method](url, body);
            setErros([]);
            return response.data;
        } catch(err) {
            setErros(err.response.data.errors || []);
        }
    };
    return { doRequest, errors };
}

export default useRequestSignUp;