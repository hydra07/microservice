// InputField.tsx
import React, { useEffect, useRef } from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string | number;
  type?: "text" | "number" | "textarea";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoFocus?: boolean;
  focusOnMount?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  type = "text",
  onChange,
  autoFocus = false,
  focusOnMount = false,
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focusOnMount && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focusOnMount]);

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          placeholder={placeholder}
          value={value.toString()}
          onChange={onChange}
          autoFocus={autoFocus}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full resize-none"
        />
      ) : (
        <input
          min={0}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          name={name}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
          autoFocus={autoFocus}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
      )}
    </div>
  );
};

export default InputField;