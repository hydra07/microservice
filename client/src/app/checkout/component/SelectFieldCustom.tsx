import { UseFormReturn } from "react-hook-form";
import { CheckoutFormType } from "CustomTypes";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface SelectFieldCustomProps {
  name: keyof CheckoutFormType;
  label: string;
  options: { id: string; name: string }[];
  form: UseFormReturn<CheckoutFormType>;
  onChange?: (value: string) => void;
}

function SelectFieldCustom({
  name,
  label,
  options,
  form,
  onChange,
}: SelectFieldCustomProps) {

  const renderOptions = (options: { id: string; name: string }[], label: string) => (
    <>
      <option value="" disabled>{`-- Select ${label} --`}</option>
      {options.map((option) => (
        <option key={option.id} value={option.name}>{option.name}</option>
      ))}
    </>
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(option => option.name === e.target.value);
    form.setValue(name, selectedOption ? selectedOption.name : "");
    if (onChange && selectedOption) onChange(selectedOption.id);
  };

  const selectClassName = (name: keyof CheckoutFormType) =>
    cn(
      "block w-full px-4 py-2 mt-2 text-base placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50",
      form.formState.errors[name]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <div className="relative">
          <select
            id={name}
            className={selectClassName(name)}
            onChange={handleChange}
            value={form.watch(name)}
          >
            {renderOptions(options, label)}
          </select>
          {form.formState.errors[name] && (
            <div className="text-red-500 text-sm font-bold">{form.formState.errors[name]?.message}</div>
          )}
        </div>
      </FormItem>
      )}
    />
  );
}

export default SelectFieldCustom;
