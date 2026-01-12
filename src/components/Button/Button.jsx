import cls from './Button.module.css';

//const inlineStyles = { color: 'lightsalmon', backgroundColor: '#ddd' }
const isPrimary = true;

export const Button = () => {
    return <button className={ isPrimary ? cls.primary : cls.btn }>
        TEST
    </button>
}