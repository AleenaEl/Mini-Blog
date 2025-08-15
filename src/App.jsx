
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import { useEffect, useState } from 'react';
import { AuthContext } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { CreatePost } from './components/CreatePost';
import { EditPost } from './components/EditPost';
import { PostDetail } from './components/PostDetail';


function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const initializeApp = () => {
      
      const token = localStorage.getItem("blog_token");
      const storedUser = localStorage.getItem("blog_user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedPosts = localStorage.getItem("blog_posts");
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts));
      } else {
       
        const mockPosts = [
          {
            id: "1",
            title: "Getting Started with React and JavaScript",
            content:
              "React with JavaScript provides an excellent foundation for building modern web applications. In this comprehensive guide, we'll explore how to set up a new project, structure your components properly, and implement best practices for component development.JavaScript brings several advantages to React development:1. Flexibility: Quick prototyping and dynamic behavior.2. Simplicity: No compilation step needed for basic development.3. Community: Vast ecosystem and resources available.4. Learning Curve: Easier entry point for new developers.Let's dive into the practical aspects of building modern React applications with JavaScript.",
            excerpt:
              "Learn how to build modern React applications with JavaScript for rapid development and flexibility.",
            author: { id: "1", username: "eldhose", email: "eldhose@example.com" },
            createdAt: "2024-12-10T10:00:00Z",
            updatedAt: "2024-12-10T10:00:00Z",
            tags: ["React", "JavaScript", "Frontend", "Web Development"],
          },
          {
            id: "2",
            title: "Building RESTful APIs with Node.js and Express",
            content:
              "Node.js and Express form a powerful combination for building scalable REST APIs. This tutorial covers everything from basic setup to advanced authentication and database integration.\n\nWe'll cover the following topics:\n\n**Setting up the Development Environment**\n- Installing Node.js and npm\n- Creating a new project structure\n- Setting up Express server\n\n**Building REST Endpoints**\n- HTTP methods and status codes\n- Request/response handling\n- Middleware implementation\n\n**Authentication and Security**\n- JWT token implementation\n- Password hashing with bcrypt\n- Rate limiting and CORS\n\n**Database Integration**\n- MongoDB with Mongoose\n- Data validation and schemas\n- Error handling patterns\n\nBy the end of this guide, you'll have a solid foundation for building production-ready APIs.",
            excerpt:
              "Complete guide to creating robust REST APIs using Node.js, Express, and MongoDB with authentication.",
            author: { id: "2", username: "aleena", email: "aleena@example.com" },
            createdAt: "2024-12-08T14:30:00Z",
            updatedAt: "2024-12-08T14:30:00Z",
            tags: ["Node.js", "Express", "API", "Backend", "MongoDB"],
          },
          {
            id: "3",
            title: "Modern CSS Techniques: Grid, Flexbox, and Beyond",
            content:
              "CSS has evolved tremendously in recent years. Modern techniques like CSS Grid, Flexbox, and CSS Custom Properties have revolutionized how we approach layout and styling.\n\n**CSS Grid for Complex Layouts**\nCSS Grid provides a two-dimensional layout system that's perfect for complex page layouts. Unlike Flexbox, which is one-dimensional, Grid allows you to work with both rows and columns simultaneously.\n\n```css\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}\n```\n\n**Flexbox for Component Layouts**\nFlexbox excels at distributing space and aligning items within a container. It's perfect for component-level layouts and handling dynamic content.\n\n**CSS Custom Properties (Variables)**\nCustom properties bring dynamic styling capabilities to CSS, making it easier to maintain consistent themes and handle responsive design.\n\n**Container Queries**\nThe future of responsive design lies in container queries, allowing components to respond to their container's size rather than the viewport.",
            excerpt:
              "Explore modern CSS techniques including Grid, Flexbox, custom properties, and the latest web standards.",
            author: { id: "1", username: "eldhose", email: "eldhose@example.com" },
            createdAt: "2024-12-05T09:15:00Z",
            updatedAt: "2024-12-05T09:15:00Z",
            tags: [
              "CSS",
              "Web Design",
              "Frontend",
              "Layout",
              "Responsive Design",
            ],
          },
          {
            id: "4",
            title: "JavaScript ES6+ Features Every Developer Should Know",
            content:
              "Modern JavaScript has introduced many powerful features that make development more efficient and code more readable. Let's explore the most important ES6+ features.\n\n**Arrow Functions**\nArrow functions provide a concise way to write function expressions:\n\n```javascript\n// Traditional function\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n```\n\n**Destructuring Assignment**\nExtract values from arrays or properties from objects:\n\n```javascript\nconst [first, second] = array;\nconst { name, age } = person;\n```\n\n**Template Literals**\nString interpolation and multi-line strings:\n\n```javascript\nconst message = `Hello, ${name}! Today is ${new Date().toDateString()}`;\n```\n\n**Async/Await**\nWrite asynchronous code that looks synchronous:\n\n```javascript\nconst fetchData = async () => {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n};\n```\n\nThese features significantly improve code readability and maintainability.",
            excerpt:
              "Master the essential ES6+ JavaScript features that every modern developer needs to know for better code.",
            author: { id: "2", username: "aleena", email: "aleena@example.com" },
            createdAt: "2024-12-03T16:20:00Z",
            updatedAt: "2024-12-03T16:20:00Z",
            tags: [
              "JavaScript",
              "ES6",
              "Programming",
              "Frontend",
              "Best Practices",
            ],
          },
        ];
        setPosts(mockPosts);
        localStorage.setItem("blog_posts", JSON.stringify(mockPosts));
      }

      setLoading(false);
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
   

    const mockUsers = [
      {
        id: "1",
        username: "eldhose",
        email: "eldhose@example.com",
        password: "password123",
      },
      {
        id: "2",
        username: "aleena",
        email: "aleena@example.com",
        password: "password123",
      },
    ];

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    console.log("kl",foundUser);
    

    if (foundUser) {
      const user = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      const token = "mock_jwt_token_" + Date.now();

      localStorage.setItem("blog_token", token);
      localStorage.setItem("blog_user", JSON.stringify(user));
      setUser(user);
      return true;
    }

    return false;
  };
  const register = async (username, email, password) => {
   

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
    };

    const token = "mock_jwt_token_" + Date.now();

    localStorage.setItem("blog_token", token);
    localStorage.setItem("blog_user", JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("blog_token");
    localStorage.removeItem("blog_user");
    setUser(null);
  };

  const authValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route path="/post/:id" element={<PostDetail posts={posts} />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route
                path="/register"
                element={user ? <Navigate to="/dashboard" /> : <Register />}
              />
              <Route
                path="/dashboard"
                element={
                  user ? (
                    <Dashboard posts={posts} setPosts={setPosts} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/create"
                element={
                  user ? (
                    <CreatePost posts={posts} setPosts={setPosts} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/edit/:id"
                element={
                  user ? (
                    <EditPost posts={posts} setPosts={setPosts} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </main>
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App
