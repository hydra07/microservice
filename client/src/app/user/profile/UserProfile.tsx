
'use client'
import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import MyPosts from "./MyPost";
import MyRecipes from "./MyRecipe";
import SavedRecipes from "./SavedRecipe";
import * as PostService from "@/services/post.service";
import * as RecipeService from "@/services/recipe.service";

// import axios from "@/lib/axios";
import { Recipe, User } from "CustomTypes";
import { PostType } from "Post";
import useAuth from "@/hooks/useAuth";

const UserProfile = () => {   
    const { user } = useAuth();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [activeSection, setActiveSection] = useState<'posts' | 'my-recipes' | 'saved-recipes'>('posts');

    
    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await PostService.getPostWithUserId(user!.id as string);
                if (res) {
                    setPosts(res);
                }
                console.log(res);
            } catch (error) {
                console.error('Error fetching posts by user! ID:', error);
            }
        };
        if (user!.id) {
            fetchPosts();
        }
    }, [user!.id]);

    // Fetch my recipes
    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const res = await RecipeService.getRecipesByUserId(user!.id as string);
                if (res) { setMyRecipes(res); }// Adjusted to match the backend response structure
                console.log(res);
            } catch (error) {
                console.error('Error fetching my recipes:', error);
            }
        };
        if (user!.id) {
            fetchMyRecipes();
        }
    }, [user!.id]);

    // Placeholder functions for edit and delete actions
    const handleEditPost = (postId: number) => {
        // Implement your edit post logic here
    };

    const handleDeletePost = (postId: number) => {
        // Implement your delete post logic here
    };

    const handleEditRecipe = (recipeId: string) => {
        // Implement your edit recipe logic here
    };

    const handleDeleteRecipe = (recipeId: string) => {
        // Implement your delete recipe logic here
    };

    const handleRemoveFromSavedRecipes = (recipeId: string) => {
        // Implement your remove from saved recipes logic here
    };

    return (
        <div className="w-full max-w-[1250px] mx-auto mt-8">
            <div className="bg-muted rounded-t-lg p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            src={user!.avatar}
                            alt={user!.email}
                            className="h-full w-full"
                        />
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">{user!.email}</h2>
                        
                    </div>
                </div>
            </div>
            <div className="border-b">
                <div className="flex justify-center">
                    <div className="flex gap-4 pt-4 text-sm font-medium">
                        <button
                            className={`px-4 py-2 rounded-t-lg hover:bg-muted/50 transition-colors ${activeSection === 'posts' ? 'bg-muted/50' : ''}`}
                            onClick={() => setActiveSection('posts')}
                        >
                            Posts
                        </button>
                        <button
                            className={`px-4 py-2 rounded-t-lg hover:bg-muted/50 transition-colors ${activeSection === 'my-recipes' ? 'bg-muted/50' : ''}`}
                            onClick={() => setActiveSection('my-recipes')}
                        >
                            My Recipes
                        </button>
                        <button
                            className={`px-4 py-2 rounded-t-lg hover:bg-muted/50 transition-colors ${activeSection === 'saved-recipes' ? 'bg-muted/50' : ''}`}
                            onClick={() => setActiveSection('saved-recipes')}
                        >
                            Saved Recipes
                        </button>
                    </div>
                </div>
                {activeSection === 'posts' && <MyPosts posts={posts}/>}
                {activeSection === 'my-recipes' && <MyRecipes recipes={myRecipes} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />}
                {activeSection === 'saved-recipes' && <SavedRecipes recipes={savedRecipes} onRemove={handleRemoveFromSavedRecipes} />}
            </div>
        </div>
    );
}

export default UserProfile;


