const items = [
  {
    task: 'Learn React',
    icon: '🥸',
    isCompleted: false,
  },
  {
    task: 'Repeat JS',
    icon: '🤬',
    isCompleted: true,
  },
  {
    task: 'Continue to Learn EN',
    icon: '🥳',
    isCompleted: false,
  },
];

export const List = () => {
  /*const [count, setCount] = useState(0);
     const setCounterHandler = () => {
     setCount((prev) => prev + 1);
     }*/
  console.log('render list');

  return (
    <div>
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? 'completed' : ''}>
            <span>{item.icon}</span>
            <h4>{item.task}</h4>
          </section>
        );
      })}
    </div>
  );
};
