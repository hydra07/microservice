"use client";
import React, { useEffect, useState } from "react";
import { CookingPotIcon, Heart, ThumbsUp } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import axios from "@/lib/axios";

interface ReactionsState {
  isLike: boolean;
  isHeart: boolean;
  isCookpot: boolean;
  likeCount: number;
  heartCount: number;
  cookpotCount: number;
}

type ReactionType = "like" | "heart" | "cookpot";

type ReactionTypeInfo = {
  stateKey: keyof Pick<ReactionsState, "isLike" | "isHeart" | "isCookpot">;
  countKey: keyof Pick<
    ReactionsState,
    "likeCount" | "heartCount" | "cookpotCount"
  >;
};
function Reactions({ recipeId }: { recipeId: string }) {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<ReactionsState>({
    isLike: false,
    isHeart: false,
    isCookpot: false,
    likeCount: 0,
    heartCount: 0,
    cookpotCount: 0,
  });
  const handleReaction = async (type: ReactionType) => {
    if (!user || !user?.id) return;

    const reactionTypes: Record<ReactionType, ReactionTypeInfo> = {
      like: { stateKey: "isLike", countKey: "likeCount" },
      heart: { stateKey: "isHeart", countKey: "heartCount" },
      cookpot: { stateKey: "isCookpot", countKey: "cookpotCount" },
    };

    const { stateKey, countKey } = reactionTypes[type];

    setReactions((prev: ReactionsState) => {
      const newState = !prev[stateKey];
      const newCount = newState ? prev[countKey] + 1 : prev[countKey] - 1;

      return {
        ...prev,
        [stateKey]: newState,
        [countKey]: newCount,
      };
    });

    try {
      await axios.post(`/api/recipe/${recipeId}/reactions`, {
        userId: user.id,
        [stateKey]: !reactions[stateKey],
      });
    } catch (error) {
      console.error(`Error updating ${type} reaction:`, error);
    }
  };
  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(
          `/api/recipe/${recipeId}/reactions${user?.id ? `?userId=${user.id}` : ""}`,
        );
        setReactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetching();
  }, [user]);
  return (
    <div className="bg-muted rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Reactions</h3>
      <div className="flex items-center space-x-8">
        <button
          className={`flex items-center space-x-2 ${reactions.isCookpot ? "text-green-100 dark:text-green-800" : ""}`}
          onClick={() => handleReaction("cookpot")}
          disabled={!user || !user?.id}
        >
          <CookingPotIcon
            className={`w-5 h-5 cursor-pointer hover:scale-125 ${
              reactions.isCookpot
                ? "text-green-500 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {reactions.cookpotCount}
          </span>
        </button>
        <button
          className={`flex items-center space-x-2 ${reactions.isHeart ? "text-red-100 dark:text-red-800" : ""}`}
          onClick={() => handleReaction("heart")}
          disabled={!user || !user?.id}
        >
          <Heart
            className={`w-5 h-5 cursor-pointer hover:scale-125 ${
              reactions.isHeart
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {reactions.heartCount}
          </span>
        </button>

        <button
          className={`flex items-center space-x-2 ${reactions.isLike ? "text-blue-100 dark:text-blue-800" : ""}`}
          onClick={() => handleReaction("like")}
          disabled={!user || !user?.id}
        >
          <ThumbsUp
            className={`w-5 h-5 cursor-pointer hover:scale-125 ${
              reactions.isLike
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {reactions.likeCount}
          </span>
        </button>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
        Total reactions to this recipe:{" "}
        {reactions.cookpotCount + reactions.heartCount + reactions.likeCount}
      </p>
    </div>
  );
}

export default Reactions;
