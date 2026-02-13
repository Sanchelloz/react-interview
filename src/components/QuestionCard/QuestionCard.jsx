import cls from './QuestionCard.module.css';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../Badge';

export const QuestionCard = ({ card }) => {
    const navigate = useNavigate();
    const LEVEL_VARIANT = {
        1: 'primary',
        2: 'warning',
    };
    const levelVariant = LEVEL_VARIANT[card.level] ?? 'alert';
    const completedVariant = card.completed ? 'success' : 'primary';

    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant}>Level: { card.level }</Badge>
                <Badge variant={completedVariant}>{card.completed ? 'Completed' : 'Not Completed'}</Badge>
            </div>
            <h5 className={cls.cardTitle}>{card.question}</h5>
            <div className={cls.cardAnswers}>
                <span>Short answer: </span>
                <p className={cls.cardAnswer}>{card.answer}</p>
            </div>
            <Button
                onClick={() => {
                    navigate(`/question/${card.id}`);
                }}
            >
                View
            </Button>
        </div>
    );
};
