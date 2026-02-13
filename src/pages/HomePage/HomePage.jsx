import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useState, useEffect, useRef, useMemo } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.js';
import { SearchInput } from '../../components/SearchInput/index.jsx';
import { Button } from '../../components/Button/index.jsx';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
    const [ searchParams, setSearchParams ] = useState(`?_page=1&_per_page=${ DEFAULT_PER_PAGE }`);
    const [ questions, setQuestions ] = useState({});
    const [ searchValue, setSearchValue ] = useState('');
    const [ sortSelectedValue, setSortSelectedValue ] = useState('');
    const [ countSelectedValue, setCountSelectedValue ] = useState('');

    const controlsContainerRef = useRef();

    const getActivePageNumber = () => questions.next === null ? questions.last : questions.next - 1;

    const cards = useMemo(() => {
        if (questions?.data) {
            if (searchValue.trim()) {
                return questions.data.filter((q) => q.question.toLowerCase().includes(searchValue.trim().toLowerCase()))
            } else {
                return questions.data;
            }
        }

        return [];
    }, [ questions, searchValue ]);

    const pagination = useMemo(() => {
        const totalCardsCount = questions?.pages || 0;

        return Array(totalCardsCount).fill(0).map((_, i) => i + 1)
    }, [ questions ]);

    const [ getQuestions, isLoading, error ] = useFetch(async (url) => {
        const response = await fetch(`${ API_URL }/${ url }`);
        const questions = await response.json();

        setQuestions(questions);

        return questions;
    });

    useEffect(() => {
        void getQuestions(`react${ searchParams }`);//?_page=1&_per_page=15
    }, [ searchParams ]);

    const onSearchChangeHandler = (event) => {
        setSearchValue(event.target.value);
    };

    const onSortSelectChangeHandler = (event) => {
        setSortSelectedValue(event.target.value);
        setSearchParams(`?_page=1&_per_page=${ countSelectedValue }&${ event.target.value }`);
    };

    const onCountSelectChangeHandler = (event) => {
        setCountSelectedValue(event.target.value);
        setSearchParams(`?_page=1&_per_page=${ event.target.value }&${ sortSelectedValue }`);
    };

    const paginationHandler = (event) => {
        if (event.target.tagName === 'BUTTON') {
            setSearchParams(`?_page=${ event.target.textContent }&_per_page=${ countSelectedValue }&${ sortSelectedValue }`);
            controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className={ cls.controlsContainer } ref={ controlsContainerRef }>
                <SearchInput value={ searchValue } onChange={ onSearchChangeHandler }/>

                <select value={ sortSelectedValue } onChange={ onSortSelectChangeHandler } className={ cls.select }
                        name="" id="">
                    <option disabled>Sort By</option>
                    <hr/>
                    <option value="_sort=level">Level ASC</option>
                    <option value="_sort=-level">Level DESC</option>
                    <option value="_sort=completed">Completed ASC</option>
                    <option value="_sort=-completed">Completed DESC</option>
                </select>

                <select value={ countSelectedValue } onChange={ onCountSelectChangeHandler } className={ cls.select }
                        name="" id="">
                    <option disabled>Count</option>
                    <hr/>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            { isLoading && <Loader/> }
            { error && <p>{ error }</p> }

            <QuestionCardList cards={ cards }/>

            {
                cards.length === 0 ? <p className={ cls.noCardsInfo }>No Cards...</p> :
                    pagination.length > 1 && <div className={ cls.paginationContainer } onClick={ paginationHandler }>
                        {
                            pagination.map((val) => {
                                return <Button key={ val } isActive={ val === getActivePageNumber() }>{ val }</Button>
                            })
                        }
                    </div>
            }
        </>
    );
};
