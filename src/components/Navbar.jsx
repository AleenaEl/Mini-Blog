import React from "react";
import { Link, useLocation } from "react-router-dom";


import {
  PenTool,
  Home,
  User,
  LogOut,
  Plus,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between">
        <div className="flex items-center justify-between space-x-8   h-16 ">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className=" font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogPlatform
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/">
              <button
                className={
                  isActive("/")
                    ? "text-blue-600 text-sm  underline underline-offset-8 decoration-2 font-semibold "
                    : "text-sm"
                }
              >
                {/* <Home className="h-4 w-4 mr-2" /> */}
                Home
              </button>
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/dashboard">
                  <button
                    className={
                      isActive("/dashboard")
                        ? "text-blue-600 text-sm   underline underline-offset-8 decoration-2 font-semibold "
                        : "text-sm"
                    }
                  >
                    {/* <LayoutDashboard className="h-4 w-4 mr-2" /> */}
                    Dashboard
                  </button>
                </Link>
                <Link to="/create">
                  <button
                    className={
                      isActive("/create")
                        ? "text-blue-600 text-sm flex underline underline-offset-8 decoration-2 font-semibold "
                        : "text-sm flex "
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Write
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500">
                    <AvatarFallback className="text-white font-semibold bg-">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create" className="cursor-pointer">
                    <PenTool className="h-4 w-4 mr-2" />
                    Write Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
