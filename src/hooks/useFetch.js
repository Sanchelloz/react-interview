import { useState } from 'react';
import { delayFn } from '../helpers/delayFn.jsx';

export const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchFn = async (args) => {
        try {
            setIsLoading(true);
            setError('');
            await delayFn();

            return await callback(args);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchFn, isLoading, error];
};
