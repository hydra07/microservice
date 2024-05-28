'use client';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
export default function ModeButton() {
  const { setTheme, theme } = useTheme();
  const [mode, setMode] = useState<boolean>();
  
  useEffect(() => {
    if (theme === 'dark') {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [theme]);

  return (
    <>
      <div className="flex flex-row space-x-2">
        <Moon className="w-6 h-6" />
        <Switch
          defaultChecked={mode}
          onCheckedChange={() => {
            if (mode) setTheme('light');
            else setTheme('dark');
          }}
        />
        <Sun className="w-6 h-6" />
      </div>
    </>
  );
}
