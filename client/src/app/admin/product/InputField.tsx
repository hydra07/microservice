// InputField.tsx
import React from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string | number;
  type?: "text" | "number" | "textarea";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value.toString()}
          onChange={onChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full resize-none"
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={value.toString()}
          type={type}
          onChange={onChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
      )}
    </div>
  );
};

export default InputField;
