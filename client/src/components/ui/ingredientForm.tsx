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

    const handleIngredientChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const newIngredients = ingredients.slice();
        newIngredients[index] = { ...newIngredients[index], [name]: value };
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
                        name="name"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="border border-gray-300 p-2 rounded-lg w-[30%]"
                        placeholder={`Input ${index + 1}`}
                    />
                    <input
                        type="number"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="border border-gray-300 p-2 rounded-lg w-[30%]"
                        placeholder={`Input ${index + 1}`}
                    />
                    <select
                        name="unit"
                        value={ingredient.unit}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="border border-gray-300 p-2 rounded-lg-lg w-[28 %]"
                    >
                        <option value="">Chọn đơn vị</option>
                        <option value="ingredientA">gram</option>
                        <option value="ingredientB">kilogram</option>
                        <option value="ingredientC">củ</option>
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
