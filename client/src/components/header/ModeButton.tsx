// 'use client';
// import { Switch } from '@/components/ui/switch';
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// export default function ModeButton() {
//   const { setTheme, theme } = useTheme();
//   const [mode, setMode] = useState<boolean>();
  
//   useEffect(() => {
//     if (theme === 'dark') {
//       setMode(true);
//     } else {
//       setMode(false);
//     }
//   }, [theme]);

//   return (
//     <>
//       <div className="flex flex-row space-x-2">
//         <Moon className="w-6 h-6" />
//         <Switch
//           defaultChecked={mode}
//           onCheckedChange={() => {
//             if (mode) setTheme('light');
//             else setTheme('dark');
//           }}
//         />
//         <Sun className="w-6 h-6" />
//       </div>
//     </>
//   );
// }
import * as React from "react"
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export default function ModeToggle() {
  const { setTheme } = useTheme()
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}