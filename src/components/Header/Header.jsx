import { Button } from '../Button/index.jsx';
import cls from './Header.module.css';
import ReactLogo from '../../assets/react.svg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className={cls.header}>
            <p onClick={() => navigate('/')}>
                <img src={ReactLogo} alt="React logo" />
                <span>ReactCards</span>
            </p>

            <div className={cls.headerButtons}>
                <Button onClick={() => navigate('/add-question')}>Add</Button>
                <Button onClick={() => navigate('/')}>Login</Button>
            </div>
        </header>
    );
};
