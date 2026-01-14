import { useState } from 'react';
import { Button } from './components/Button/Button.jsx';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const setCounterHandler = () => {
    setCount((prev) => prev + 1);
  };
  //console.log('render counter');

  return <Button onClick={setCounterHandler}>count is {count}</Button>;
};
