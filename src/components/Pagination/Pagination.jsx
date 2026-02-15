import cls from './Pagination.module.css';
import { Button } from '../Button';
import { useMemo } from 'react';

export const Pagination = ({ listData, onClick }) => {
    const getActivePageNumber = () => listData.next === null ? listData.last : listData.next - 1;
    const pagination = useMemo(() => {
        const totalCardsCount = listData?.pages || 0;

        return Array(totalCardsCount).fill(0).map((_, i) => i + 1)
    }, [ listData ]);

    return (
        pagination.length > 1 && <div className={ cls.paginationContainer } onClick={ onClick }>
            {
                pagination.map((val) => {
                    return <Button key={ val } isActive={ val === getActivePageNumber() }>{ val }</Button>
                })
            }
        </div>
    )
}
