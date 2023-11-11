import { useState, useEffect } from 'react';
import { BsCircle, BsCheck2Circle } from 'react-icons/bs';
type Props = {
   onClick: (value: string) => void;
   disable: boolean;
   colorPrimary: string;
   value: string;
};

const ButtonCheck = ({ onClick, disable, colorPrimary, value }: Props) => {
   const [isClicked, setIsClicked] = useState<boolean>(disable);
   useEffect(() => {
      setIsClicked(disable);
   }, [disable]);
   return (
      <button
         className={`bg-white p-2 flex justify-center items-center gap-2  ${
            isClicked ? '!bg-greenP300 !text-greenP800 !border-none' : ''
         }`}
         onClick={() => {
            if (isClicked) return;
            setIsClicked(true);
            onClick(value.toLowerCase());
         }}
         style={{ color: colorPrimary, border: `1px solid ${colorPrimary}`, borderRadius: '5px' }}
      >
         {isClicked ? <BsCheck2Circle /> : <BsCircle />}
         <span className='font-bold'>{value}</span>
      </button>
   );
};

export default ButtonCheck;