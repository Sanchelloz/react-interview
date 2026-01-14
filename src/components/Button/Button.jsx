import cls from './Button.module.css';

//const inlineStyles = { color: 'lightsalmon', backgroundColor: '#ddd' }
const isPrimary = false;

export const Button = ({ onClick, children }) => {
  //console.log(children);

  return (
    <button className={`${cls.btn} ${isPrimary ? cls.primary : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};
