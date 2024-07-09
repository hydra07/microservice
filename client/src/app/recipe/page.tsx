"use client";
import { useSearchParams } from "next/navigation";
import ListRecipe from "@/app/recipe/components/ListRecipe";

export default function RecipeList() {
  const link = useSearchParams();
  const tag = link.get("tag") ?? null;
  const page = Number(link.get("page") ?? 1);
  return <ListRecipe tag={tag} page={page !== 0 ? page : 1} />;
}
