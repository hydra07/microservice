import RecipeForm from "@/app/recipe/components/RecipeForm";
import UserWrapper from "@/components/UserWrapper";

export default function AddRecipe() {
  return (
    <>
      <UserWrapper>
        <div className="px-5">
          <RecipeForm />
        </div>
      </UserWrapper>
    </>
  );
}
