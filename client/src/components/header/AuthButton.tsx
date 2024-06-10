// 'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';
// import { useAppDispatch } from '../../lib/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
export default function AuthButton() {
  // const dispatch = useAppDispatch();
  // const auth = useAppSelector((state) => state.auth);
  const { data: session, status } = useSession();
  // const handleDiscordLogin = async () => {
  //   await dispatch(loginDiscordAsync());
  // };
  const handleGoogleLogin = async () => {
    await signIn('google');
  };
  const handleLogout = async () => {
    // await dispatch(logoutAsync());
    await signOut();
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
              <Button
                className="bg-indigo-600"
                // onClick={handleDiscordLogin}
              >
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

  const userAvatar = useCallback(() => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={session?.user.avatar as string}></AvatarImage>
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
  }, [status]);

  // return <>{auth.isLoggedIn ? userAvatar() : loginForm()}</>;
  // return <>{status === 'authenticated' ? userAvatar() : loginForm()}</>;
  return <>{session?.user ? userAvatar() : loginForm()}</>;
  // return <>{auth.isLoggedIn ? <div></div> : loginForm()}</>;
}
