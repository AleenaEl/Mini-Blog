import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  User,
  Search,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export function Home({ posts }) {
    console.log("posts",posts);
    
  const [selectedTag, setSelectedTag] = useState(null);

 
  const filteredPosts = posts.filter((post) => {
   

    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return  matchesTag;
  });

  
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  const getRandomGradient = (index) => {
    const gradients = [
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
      "from-orange-500 to-red-500",
      "from-purple-500 to-pink-500",
      "from-indigo-500 to-blue-500",
      "from-yellow-500 to-orange-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="max-w-6xl mx-auto">
     
          <div className="text-center mb-12">
              
        <h1 className="text-4xl md:text-5xl  font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Welcome to BlogPlatform
        </h1>
        <p className="text-xs md:text-base text-slate-600 max-w-2xl mx-auto">
          Discover amazing stories, insightful articles, and expert opinions
          from our community of writers.
        </p>
      </div>

     
      <div className="mb-8 space-y-4">
       

       
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className={
              selectedTag === null ? "bg-blue-600 hover:bg-blue-700" : ""
            }
          >
            All Posts
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={
                selectedTag === tag ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

   
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No posts found
          </h3>
          <p className="text-slate-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    className={`h-8 w-8 bg-gradient-to-br ${getRandomGradient(
                      index
                    )}`}
                  >
                    <AvatarFallback className="text-white text-xs font-semibold bg-">
                      {getInitials(post.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {post.author.username}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <CalendarDays className="h-2 w-2" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600"
                    >
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link to={`/post/${post.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    
      {posts.length > 0 && (
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Have a story to tell?
          </h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Join our community of writers and share your insights with the
            world.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
