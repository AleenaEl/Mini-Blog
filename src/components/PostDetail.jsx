import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Edit, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="text-4xl text-slate-500">📝</div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Post Not Found
        </h2>
        <p className="text-slate-600 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

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



  const readingTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <div className="max-w-4xl mx-auto">
     
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

 
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
        <CardContent className="p-8">
          <div className="space-y-6">
           
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500">
                <AvatarFallback className="text-white font-semibold bg-">
                  {getInitials(post.author.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-semibold text-slate-800">
                    {post.author.username}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-1">
                  {post.author.email}
                </p>
              </div>
              <Link to={`/edit/${post.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>

           
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-4">
                {post.title}
              </h1>

              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

     
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
        <CardContent className="p-8">
          <article className="prose prose-slate max-w-none">
            {post.content}
          </article>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500">
                <AvatarFallback className="text-white text-sm font-semibold bg-">
                  {getInitials(post.author.username)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-slate-800">
                  Written by {post.author.username}
                </p>
                <p className="text-sm text-slate-600">
                  Published on {formatDate(post.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                More Posts
              </Button>
              <Link to={`/edit/${post.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
