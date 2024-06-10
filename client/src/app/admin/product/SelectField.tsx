// SelectField.tsx
import TooltipWrapper from "./TooltipWrapper";

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: { id: string; unit: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  tooltipDelay?: number;  // Optional delay prop for tooltip
  tooltipSide?: "top" | "bottom" | "left" | "right";  // Optional side prop for tooltip
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  tooltipDelay,
  tooltipSide,
}) => {
  return (
    <div className="relative">
      <TooltipWrapper label={label} delay={tooltipDelay} sideStyle={tooltipSide}>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.unit}
            </option>
          ))}
        </select>
      </TooltipWrapper>
    </div>
  );
};

export default SelectField;
