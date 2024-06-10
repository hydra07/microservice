import React, { useState } from 'react';
import IngredientForm from './ingredientForm';
import StepForm from './stepform';
import axios from '@/lib/axios';

interface FormData {
    foodName: string;
    description: string;
    portion: number;
    cookTime: number;
    imageUrl: string;
    image: File | null;
    ingredients: { name: string; quantity: number; unit: string }[];
    steps: { description: string; image: File | null }[];
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        foodName: '',
        description: '',
        portion: 0,
        cookTime: 0,
        imageUrl: '',
        image: null,
        ingredients: [{ name: '', quantity: 0, unit: '' }],
        steps: [{ description: '', image: null }],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement & HTMLTextAreaElement;
        if (name === 'imageUrl' && files) {
            setFormData({
                ...formData,
                image: files[0],
                imageUrl: URL.createObjectURL(files[0]),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Chuẩn bị dữ liệu form để gửi đến API
        const formDataToSend = new FormData();
        formDataToSend.append('foodName', formData.foodName);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('portion', formData.portion.toString());
        formDataToSend.append('cookTime', formData.cookTime.toString());
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        formDataToSend.append('ingredients', JSON.stringify(formData.ingredients));
        formDataToSend.append('steps', JSON.stringify(formData.steps.map((step) => ({
            description: step.description,
            image: step.image ? step.image.name : null,
        }))));

        // try {
        //     const res = await axios.post('/api/recipes', formDataToSend);
        //     if (res.status === 201) {
        //         console.log('Recipe created successfully:', res.data);
        //     }
        // } catch (error) {
        //     console.error('There was a problem with the fetch operation:', error);
        // }
        console.log(formData, 'gay');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-md w-full max-w-5xl">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block" htmlFor="foodName">Tên Món Ăn: </label>
                        <input
                            type="text"
                            id="foodName"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block" htmlFor="description">Mô tả: </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>
                    <div className="flex">
                        <div className="pr-3">
                            <label htmlFor="portion">Khẩu phần: </label>
                            <input
                                type="number"
                                id="portion"
                                name="portion"
                                value={formData.portion}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full"
                            />
                        </div>
                        <div className="pr-3">
                            <label htmlFor="cookTime">Thời gian nấu: </label>
                            <input
                                type="number"
                                id="cookTime"
                                name="cookTime"
                                value={formData.cookTime}
                                onChange={handleChange}
                                className="border border-gray-300 p-2 rounded-lg w-full"
                            />
                        </div>
                        <div className="h-20">
                            <label htmlFor="imageUrl">Hình ảnh món: </label>
                            <input
                                type="file"
                                id="imageUrl"
                                name="imageUrl"
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <IngredientForm
                        ingredients={formData.ingredients}
                        setIngredients={(ingredients) => setFormData({ ...formData, ingredients })}
                    />
                    <StepForm
                        steps={formData.steps}
                        setSteps={(steps) => setFormData({ ...formData, steps })}
                    />
                    <button className="bg-sky-500 hover:bg-sky-700 rounded-full px-4 py-2 text-sm w-full" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
