    // Ingredient.tsx
    import React, { ChangeEvent } from "react";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { TrashIcon } from "lucide-react";
    import { IngredientForm } from "CustomTypes";


    interface IngredientProps {
      ingredient: { name: string; quantity: string };
      index: number;
      onRemove: (index: number) => void;
      onChange: (index: number, name: keyof IngredientForm, value: string) => void;
    }

    const Ingredient: React.FC<IngredientProps> = ({
      ingredient,
      index,
      onRemove,
      onChange,
    }) => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-4 items-center ">
          <Input
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(index, "name", e.target.value)
            }
            className="border-amber-300 focus:border-amber-500"
          />
          <Input
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(index, "quantity", e.target.value)
            }
            className="border-amber-300 focus:border-amber-500"
          />
          <Button onClick={() => onRemove(index)} variant="ghost" size="icon">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    };

    export default Ingredient;
