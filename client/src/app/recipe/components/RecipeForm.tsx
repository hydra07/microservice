"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddImage from "@/app/recipe/components/AddImage";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FilePlus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiple-select";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function RecipeForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      images: [""],
      steps: [{ description: "", images: [""] }],
      ingredients: [{ name: "", quantity: 0, unit: "" }],
      cook_time: 0,
      serving: 0,
    },
  });
  // const { Dropzone } = useImagesUpload("recipe");

  const onsubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Please enter your post title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <AddImage type="recipe" onChange={field.onChange} />
              </FormControl>
              <FormDescription>Please enter your recipe image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Steps</FormLabel>
              <FormControl>
                <AddStep value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Please enter your recipe steps.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <AddIngredients value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Please enter your recipe ingredients.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}

interface Step {
  description: string;
  images: string[];
}

interface AddStepProps {
  value: Step[];
  onChange: (steps: Step[]) => void;
}

export function AddStep({ value, onChange }: AddStepProps) {
  const addStep = () => {
    onChange([...value, { description: "", images: [] }]);
  };

  const updateStep = (
    index: number,
    field: keyof Step,
    newValue: string | string[],
  ) => {
    const newSteps = [...value];
    newSteps[index] = { ...newSteps[index], [field]: newValue };
    onChange(newSteps);
  };

  const removeStep = (index: number) => {
    const newSteps = value.filter((_, i) => i !== index);
    onChange(newSteps);
  };

  // const handleImageChange = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   const files = Array.from(e.target.files || []);
  //   const imageNames = files.map((file) => file.name);
  //   updateStep(index, "images", imageNames);
  // };

  return (
    <div className="space-y-4">
      {value.map((step, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="end-0">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeStep(index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex flex-col">
            <div className="flex flex-col space-x-4">
              <div className="space-y-2 pl-4">
                <Label htmlFor={`step-${index}`}>Bước {index + 1}</Label>
                <Textarea
                  id={`step-${index}`}
                  value={step.description}
                  onChange={(e) =>
                    updateStep(index, "description", e.target.value)
                  }
                  placeholder="Mô tả bước này..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`images-${index}`}>Hình ảnh</Label>
                {/*<Input*/}
                {/*  id={`images-${index}`}*/}
                {/*  type="file"*/}
                {/*  multiple*/}
                {/*  onChange={(e) => handleImageChange(e, index)}*/}
                {/*  className="w-[200px]"*/}
                {/*/>*/}
                <AddImage
                  type="recipe"
                  onChange={(images) => updateStep(index, "images", images)}
                  options={{ horizontal: true }}
                />
                {step.images.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Đã chọn: {step.images.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addStep} className="mt-4" variant="outline" size="icon">
        <FilePlus className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function AddIngredients({ value, onChange }: any) {
  const [ingredientsExist, setIngredientsExist] = useState<
    { _id: string; name: string; quantity: number; unit: string }[]
  >([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      const res = await axios.get("/api/recipe/ingredients");
      const data = res.data;
      setIngredientsExist(data);
    };
    fetching().finally(() => setIsLoading(false));
  }, []);
  //when ingredients change update value with onChange
  useEffect(() => {
    //find the ingredient by name
    const selectedIngredients = ingredientsExist.filter((ingredient) =>
      ingredients.includes(ingredient.name),
    );
    onChange(selectedIngredients);
  }, [ingredients]);
  return (
    <div>
      <div>
        <div>List Ingredient</div>
        <div>
          {value.map((ingredient: any, index: number) => (
            <div key={index}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...value];
                    newIngredients[index].name = e.target.value;
                    onChange(newIngredients);
                  }}
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...value];
                    newIngredients[index].quantity = +e.target.value;
                    onChange(newIngredients);
                  }}
                />
              </div>
              <div>
                <label>Unit</label>
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...value];
                    newIngredients[index].unit = e.target.value;
                    onChange(newIngredients);
                  }}
                />
              </div>
              <Button
                onClick={() => {
                  const newIngredients = value.filter(
                    (_: any, i: number) => i !== index,
                  );
                  onChange(newIngredients);
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
      <MultiSelector onValuesChange={setIngredients} values={ingredients}>
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select people to invite" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {ingredientsExist.map((ingredient) => (
              <MultiSelectorItem key={ingredient._id} value={ingredient.name}>
                {ingredient.name} - {ingredient.quantity} : {ingredient.unit}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
      <div>
        <button>them nguyen lieu</button>
        <div>
          <input placeholder={"name"} />
          <input />
        </div>
      </div>
    </div>
  );
}
