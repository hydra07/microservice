// 'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { loginDiscordAsync, logoutAsync } from '@/lib/features/auth/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
export default function AuthButton() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const handleDiscordLogin = async () => {
    await dispatch(loginDiscordAsync());
  };
  const handleGoogleLogin = async () => {};
  const handleLogout = async () => {
    await dispatch(logoutAsync());
  };

  const loginForm = () => {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Authenticate</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Authenticate</DialogTitle>
              <DialogDescription>
                Đăng nhập để sử dụng các tính năng của Letcook!!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col justify-center space-y-4 ">
              <Button className="bg-indigo-600" onClick={handleDiscordLogin}>
                Đăng nhập với Discord
              </Button>
              <Button className="bg-red-600" onClick={handleGoogleLogin}>
                Đăng nhập với Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const userAvatar = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>{'OK'}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 flex flex-col">
          <DropdownMenuItem className="w-full" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return <>{auth.isLoggedIn ? userAvatar() : loginForm()}</>;
  // return <>{auth.isLoggedIn ? <div></div> : loginForm()}</>;
}
