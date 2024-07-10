"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import GeneralInfo from "./GeneralInfo";
import Review from "./Review";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Ingredient from "./Ingredient";
import Step from "./Step";
import { IngredientForm, StepForm } from "CustomTypes";

const EnhancedRecipeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [servings, setServings] = useState<string>(""); 
  const [difficulty, setDifficulty] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IngredientForm[]>([
    { name: "", quantity: "" },
  ]);
  const [steps, setSteps] = useState<StepForm[]>([
    { description: "", images: [] },
  ]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }

    return () => {
      if (image) {
        URL.revokeObjectURL(imagePreview as string);
      }
    }
  }, [image]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const updateIngredient = (
    index: number,
    name: keyof IngredientForm,
    value: string
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, { description: "", images: [] }]);
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
    //cleanup
    newSteps[index].images.forEach(image => URL.revokeObjectURL(URL.createObjectURL(image)));
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const updateStep = (index: number, field: keyof StepForm, value: any) => {
    const newSteps = [...steps];
    if(field === "images") {
      //cleanup
      newSteps[index].images.forEach(image => URL.revokeObjectURL(URL.createObjectURL(image)));
    }
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  // //clean up
  // useEffect(() => {
  //   return () => {
  //     steps.forEach(step => {
  //       step.images.forEach(image => URL.revokeObjectURL(URL.createObjectURL(image)));
  //     });
  //   };
  // }, [steps])

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 bg-[#ece3d4] font-mono">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">Add New Recipe</h1>
          <p className="text-amber-700">
            Fill out the form to add a new recipe to your collection.
          </p>
        </div>
        <div className="relative">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  s <= currentStep
                    ? "bg-amber-500 text-white"
                    : "bg-amber-200 text-amber-700"
                } transition-all duration-300`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 w-full h-1 bg-amber-200">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
        <div className="space-y-6">
          {currentStep === 1 && (
            <GeneralInfo
              onImageUpload={handleImageUpload}
              image={imagePreview}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              cookTime={cookTime}
              setCookTime={setCookTime}
              servings={servings}
              setServings={setServings}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800">Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  ingredient={ingredient}
                  index={index}
                  onRemove={removeIngredient}
                  onChange={updateIngredient}
                />
              ))}
              <Button
                onClick={addIngredient}
                variant="outline"
                className="w-full"
                type="button"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800">
                Cooking Steps
              </h2>
              {steps.map((step, index) => (
                <Step
                  key={index}
                  step={step}
                  index={index}
                  onRemove={removeStep}
                  onChange={updateStep}
                />
              ))}
              <Button
                onClick={addStep}
                variant="outline"
                className="w-full"
                type="button"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>
          )}
          {currentStep === 4 && (
            <Review
              title={title}
              description={description}
              image={imagePreview}
              ingredients={ingredients}
              steps={steps}
              cookTime={cookTime}
              servings={servings}
              difficulty={difficulty}
            />
          )}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="bg-amber-100 text-amber-800"
              >
                Previous
              </Button>
            )}
            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-amber-500 hover:bg-amber-600 text-white"
                type="button"
              >
                Next
              </Button>
            ) : (
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Save Recipe
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedRecipeForm;