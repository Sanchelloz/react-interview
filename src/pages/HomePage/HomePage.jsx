import cls from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useState, useEffect, useRef, useMemo } from 'react';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch.js';
import { SearchInput } from '../../components/SearchInput';
import { Button } from '../../components/Button';
import { Select } from '../../components/Select';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
    const [ searchParams, setSearchParams ] = useState(`?_page=1&_per_page=${ DEFAULT_PER_PAGE }`);
    const [ questions, setQuestions ] = useState({});
    const [ searchValue, setSearchValue ] = useState('');
    const [ sortSelectedValue, setSortSelectedValue ] = useState('');
    const [ countSelectedValue, setCountSelectedValue ] = useState('');

    const controlsContainerRef = useRef();
    const sortOptions = [
        { label: 'Level ASC', value: '_sort=level' },
        { label: 'Level DESC', value: '_sort=-level' },
        { label: 'Completed ASC', value: '_sort=completed' },
        { label: 'Completed DESC', value: '_sort=-completed' },
    ];
    const countOptions = [
        { label: 10, value: 10 },
        { label: 25, value: 25 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
    ];
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

                <Select value={ sortSelectedValue } onChange={ onSortSelectChangeHandler }
                        options={ sortOptions } title="Sort By" id='sortSelect' />

                <Select value={ countSelectedValue } onChange={ onCountSelectChangeHandler }
                        options={ countOptions } title="Count" id='countSelecte' />
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
