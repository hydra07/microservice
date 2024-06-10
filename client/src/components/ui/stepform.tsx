import React, { useState } from 'react';

interface Step {
    description: string;
    image: File | null;
}

interface StepFormProps {
    steps: Step[];
    setSteps: (steps: Step[]) => void;
}

const StepForm: React.FC<StepFormProps> = ({ steps, setSteps }) => {
    const handleAddStep = () => {
        setSteps([...steps, { description: '', image: null }]);
    };

    const handleStepChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = event.target as HTMLInputElement & HTMLTextAreaElement;
        const newSteps = steps.slice();
        if (name === 'image' && files) {
            newSteps[index] = { ...newSteps[index], image: files[0] };
        } else {
            newSteps[index] = { ...newSteps[index], [name]: value };
        }
        setSteps(newSteps);
    };

    const handleRemoveStep = () => {
        if (steps.length > 1) {
            setSteps(steps.slice(0, steps.length - 1));
        }
    };

    return (
        <div>
            {steps.map((step, index) => (
                <div key={index} className="mb-3 p-2">
                    <label>Bước {index + 1}: </label>
                    <input
                        type="text"
                        name="description"
                        value={step.description}
                        onChange={(e) => handleStepChange(index, e)}
                        className="border border-gray-300 p-2 rounded-lg w-1/2"
                        placeholder={`Input ${index + 1}`}
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => handleStepChange(index, e)}
                        className="border border-gray-300 rounded-lg"
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddStep}
                className="bg-blue-500 text-white p-2 mt-2"
            >
                Add Input
            </button>
            <button
                type="button"
                onClick={handleRemoveStep}
                className="bg-red-500 text-white p-2 mt-2"
            >
                Delete
            </button>
        </div>
    );
};

export default StepForm;
