import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.js';
import { SearchInput } from '../../components/SearchInput/index.jsx';

export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQuestions(questions);

        return questions;
    });

    useEffect(() => {
        void getQuestions('react');
    }, []);

    const onSearchChangeHandler = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
            <div className={cls.controlsContainer}>
                <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
            </div>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    );
};
