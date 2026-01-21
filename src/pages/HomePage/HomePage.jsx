import cls from './HomePage.module.css';
import { QuestionCard } from '../../components/QuestionCard';
import { API_URL } from '../../constants';
import { useState, useEffect } from 'react';

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/react`);
            const questions = await response.json();
            setQuestions(questions);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <>
            {questions.map((card, index) => {
                return <QuestionCard card={card} key={index} />;
            })}
        </>
    );
};
