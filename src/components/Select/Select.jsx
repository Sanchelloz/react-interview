import cls from './Select.module.css'

export const Select = ({ value, onChange, options = [], title = '', id = '' }) => {
    return (
        <div className={ cls.selectWrapper }>
            <select value={ value } onChange={ onChange } className={ cls.select }
                    name={ id } id={ id }>
                { title.length && <option disabled>{ title }</option> }
                { title.length && <hr/> }
                {
                    options.map((opt) => {
                        return <option value={ opt.value }>{ opt.label }</option>
                    })
                }
            </select>
        </div>
    )
}
