import React, { useState } from 'react';

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

interface IngredientFormProps {
    ingredients: Ingredient[];
    setIngredients: (ingredients: Ingredient[]) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ ingredients, setIngredients }) => {
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setIngredients(newIngredients);
    };

    const handleRemoveIngredient = () => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.slice(0, ingredients.length - 1));
        }
    };

    return (
        <div>
            {ingredients.map((ingredient, index) => (
                <div key={index} className="mb-3 p-2">
                    <label>Nguyên liệu {index + 1}: </label>
                    <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-[30%]"
                        placeholder={`Input ${index + 1}`}
                    />
                    <input
                        type="number"
                        value={ingredient.quantity.toString()}
                        onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-[30%]"
                        placeholder={`Input ${index + 1}`}
                    />
                    <select
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg-lg w-[28 %]"
                    >
                        <option value="">Chọn đơn vị</option>
                        <option value="gram">gram</option>
                        <option value="kilogram">kilogram</option>
                        <option value="củ">củ</option>
                    </select>
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-blue-500 text-white p-2 rounded-lg-lg mt-2"
            >
                Add Input
            </button>
            <button
                type="button"
                onClick={handleRemoveIngredient}
                className="bg-red-500 text-white p-2 rounded-lg-lg mt-2"
            >
                Delete
            </button>
        </div>
    );
};

export default IngredientForm;

