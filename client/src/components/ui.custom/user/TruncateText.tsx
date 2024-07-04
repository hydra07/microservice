import React from 'react';

interface TruncateTextProps {
  text: string;
  maxLength: number;
  className?: string;
}

export const TruncateText: React.FC<TruncateTextProps> = ({ text, maxLength, className = '' }) => {
  const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <p className={`line-clamp-2 ${className}`}>
      {truncatedText}
    </p>
  );
};