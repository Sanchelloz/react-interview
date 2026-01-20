import cls from './QuestionCard.module.css';
import { Button } from '../Button';

export const QuestionCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level: 1</div>
                <div>Not Completed</div>
            </div>
            <h5 className={cls.cardTitle}>What is JSX7</h5>
            <div className={cls.cardAnswers}>
                <span>Short answer: </span>
                <p className={cls.cardAnswer}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, minima.</p>
            </div>
            <Button onClick={() => {}}>View</Button>
        </div>
    );
};
