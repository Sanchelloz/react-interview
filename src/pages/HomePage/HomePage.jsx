import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useState, useEffect } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { delayFn } from '../../helpers/delayFn.jsx';

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsQLoading] = useState(false);

    const getQuestions = async () => {
        try {
            setIsQLoading(true);
            await delayFn();
            const response = await fetch(`${API_URL}/react`);
            const questions = await response.json();
            setQuestions(questions);
        } catch (err) {
            console.error(err);
        } finally {
            setIsQLoading(false);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <>
            {isLoading && <Loader />}
            <QuestionCardList cards={questions} />
        </>
    );
};
