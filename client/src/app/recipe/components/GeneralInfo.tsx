// GeneralInfo.tsx
import React, { ChangeEvent } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface GeneralInfoProps {
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void
  image: string | null
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  cookTime: string
  setCookTime: (cookTime: string) => void
  servings: string
  setServings: (servings: string) => void
  difficulty: string
  setDifficulty: (difficulty: string) => void
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  onImageUpload,
  image,
  title,
  setTitle,
  description,
  setDescription,
  cookTime,
  setCookTime,
  servings,
  setServings,
  difficulty,
  setDifficulty
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            placeholder="Enter recipe title"
            className="border-amber-300 focus:border-amber-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Display Image</Label>
          <Input
            id="image"
            type="file"
            onChange={onImageUpload}
            className="border-amber-300 focus:border-amber-500"
          />
          {image && <img src={image} alt="Recipe preview" className="mt-2 max-w-full h-auto rounded" />}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your recipe"
          className="border-amber-300 focus:border-amber-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cook-time">Cook Time</Label>
          <Input
            id="cook-time"
            type="number"
            placeholder="Minutes"
            className="border-amber-300 focus:border-amber-500"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="servings">Servings</Label>
          <Input
            id="servings"
            type="number"
            placeholder="Number of servings"
            className="border-amber-300 focus:border-amber-500"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="border-amber-300 focus:border-amber-500">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo