'use client'
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import EditProfile from "./EditProfile";
import MyPosts from "./MyPost";
import MyRecipes from "./MyRecipe";
import SavedRecipes from "./SavedRecipe";
import axios from "@/lib/axios";

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    phone?: string;
    initials?: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    category?: string;
}

interface Recipe {
    id: number;
    name: string;
    description: string;
    initials?: string;
}

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState<User>({} as User);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [activeSection, setActiveSection] = useState<'posts' | 'my-recipes' | 'saved-recipes'>('posts');

    useEffect(() => {
        fetch("/data/user.json")
            .then((response) => response.json())
            .then((data) => setUserInfo(data))
            .catch((error) => console.error('Error fetching user info:', error));

        fetch("/data/my-posts.json")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));

    useEffect(() => {
        const fetching = async () => {
            try {
                const res = await axios.get(`/api/recipe/user/userId=${userInfo.id}`);
                setMyRecipes(res.data.recipes); // Adjusted to match the backend response structure
                console.log(res.data.recipes);
            } catch (error) {
                console.error('Error fetching my recipes:', error);
            }
        };
        fetching();
    }, [userInfo.id]);
        fetch("/data/saved-recipes.json")
            .then((response) => response.json())
            .then((data) => setSavedRecipes(data))
            .catch((error) => console.error('Error fetching saved recipes:', error));
    }, []);

    const handleEditProfileSave = (updatedUser: { name: string; email: string; phone: string }) => {
        setUserInfo((prevUser) => ({
            ...prevUser,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
        }));
    };

    const handleEditPost = (postId: number, updatedPost: Post) => {
        setPosts(posts.map(post => post.id === postId ? updatedPost : post));
    };

    const handleDeletePost = (postId: number) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    const handleEditRecipe = (recipeId: number, updatedRecipe: Recipe) => {
        setMyRecipes(myRecipes.map(recipe => recipe.id === recipeId ? updatedRecipe : recipe));
    };

    const handleDeleteRecipe = (recipeId: number) => {
        setMyRecipes(myRecipes.filter((recipe) => recipe.id !== recipeId));
    };

    const handleRemoveFromSavedRecipes = (recipeId: number) => {
        setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== recipeId));
    };

    return (
        <div className="w-full max-w-[1250px] mx-auto mt-8">
            <div className="bg-muted rounded-t-lg p-6 md:p-8">
                <div className="flex items-center gap-4">
                    {/* <Avatar>
                        <AvatarImage
                            src={userInfo.avatar}
                            alt={userInfo.name}
                        />
                        {userInfo.initials && (
                            <AvatarFallback>
                                {userInfo.initials}
                            </AvatarFallback>
                        )}
                    </Avatar> */}
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">{userInfo.name}</h2>
                        <p className="text-muted-foreground">{userInfo.email}</p>
                        <p className="text-muted-foreground">{userInfo.phone}</p>
                    </div>
                    <div className="ml-auto">
                        <EditProfile
                            user={{
                                name: userInfo.name,
                                email: userInfo.email,
                                phone: userInfo.phone || "",
                            }}
                            onClose={() => setIsEditProfile(false)}
                            onSave={handleEditProfileSave}
                        />
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
                {activeSection === 'posts' && <MyPosts posts={posts} onEdit={handleEditPost} onDelete={handleDeletePost} />}
                {activeSection === 'my-recipes' && <MyRecipes recipes={myRecipes} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />}
                {activeSection === 'saved-recipes' && <SavedRecipes recipes={savedRecipes} onRemove={handleRemoveFromSavedRecipes} />}
            </div>
        </div>
    );
};

export default UserProfile;