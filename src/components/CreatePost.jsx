import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";


export function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const generateExcerpt = (content) => {
    const plainText = content.replace(/[#*`]/g, "").trim();
    const sentences = plainText.split(".").filter((s) => s.trim().length > 0);
    const excerpt =
      sentences.slice(0, 2).join(".") + (sentences.length > 2 ? "." : "");
    return excerpt.length > 150 ? excerpt.substring(0, 150) + "..." : excerpt;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.length < 50) {
      newErrors.content = "Content must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setSaving(true);

    try {
      const newPost = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        excerpt: generateExcerpt(content),
        author: user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: tags,
      };

      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("blog_posts", JSON.stringify(updatedPosts));

      toast.success("Post created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">Create New Post</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Write Your Post</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`text-lg ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post content here... You can use Markdown formatting!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`min-h-96 resize-none ${
                      errors.content ? "border-red-500" : ""
                    }`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                  )}
                  <p className="text-sm text-slate-500">
                    {content.length} characters
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Publishing..." : "Publish Post"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || tags.length >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-2 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-slate-500">
                {tags.length}/10 tags added
              </p>
            </CardContent>
          </Card>

          {/* Preview Section */}
          {(title || content) && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {title && (
                  <h3 className="font-semibold text-slate-800 line-clamp-2">
                    {title}
                  </h3>
                )}
                {content && (
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {generateExcerpt(content)}
                  </p>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-700">
              <p>• Write an engaging title that captures attention</p>
              <p>• Start with a strong opening paragraph</p>
              <p>• Use subheadings to organize your content</p>
              <p>• Add relevant tags to help readers find your post</p>
              <p>• Proofread before publishing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
