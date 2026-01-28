import React, { useId } from 'react'
import cls from './SearchInput.module.css'
import { SearchIcon } from '../Icons.jsx';

export const SearchInput = ({ value, onChange }) => {
    const inputId = useId();

    return (
        <div className={ cls.inputContainer }>
            <label htmlFor=""> <SearchIcon className={cls.searchIcon}/> </label>
            <input type="text" className={ cls.input } value={ value } onChange={ onChange }
                   id={ inputId } placeholder='Search...' />
        </div>
    )
}
