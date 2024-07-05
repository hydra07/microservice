import { useState } from 'react';
import { Check, X } from 'lucide-react';

const ActionButton = ({ type, onClick } : {
    type: 'accept' | 'reject';
    onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "relative flex items-center justify-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out overflow-hidden";
  const hoverClasses = isHovered
    ? (type === 'accept' ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
    : (type === 'accept' ? 'bg-white text-green-500 border border-green-500' : 'bg-white text-red-500 border border-red-500');
  const widthClasses = isHovered ? 'w-32' : 'w-24';

  return (
    <button
      className={`${baseClasses} ${hoverClasses} ${widthClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className={`absolute left-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {type === 'accept' ? <Check size={16} /> : <X size={16} />}
      </span>
      <span className={`transition-transform duration-300 ${isHovered ? 'transform translate-x-4' : ''}`}>
        {type === 'accept' ? 'Accept' : 'Reject'}
      </span>
    </button>
  );
};

export default ActionButton;