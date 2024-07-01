import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon, X, Circle, LoaderCircle } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, isLoading }) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    onSearchChange(event);
    setTimeout(() => {
      setIsSearching(false);
    }, 500); // Adjust the delay as needed
  };

  const clearSearch = () => {
    handleInputChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className=" flex items-center ">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            onChange={handleInputChange}
            value={searchTerm}
            type="text"
            placeholder="Search product..."
            className="w-full rounded-md bg-white px-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-950 dark:text-gray-50"
          />

          {searchTerm && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isSearching ? (
                <LoaderCircle className="h-5 w-5 text-primary-500 animate-spin" />
              ) : (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;


/*

  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6">
      <div className="container mx-auto flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            onChange={onSearchChange}
            value={searchTerm}
            type="text"
            placeholder="Search product..."
            className="w-full rounded-md bg-white px-10 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-950 dark:text-gray-50"
          />

          {searchTerm && !isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Circle className="h-5 w-5 text-primary-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

*/