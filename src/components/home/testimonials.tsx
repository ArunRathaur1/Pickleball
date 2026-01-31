import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, User, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API;

interface Blog {
  _id: string;
  name: string;
  heading: string;
  description: string;
  createdAt: string;
  imageUrl: string;
}

export function Testimonials() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 4 && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setStartIndex((prev) => (prev + 1) % blogs.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [blogs.length, isPaused]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  // 🛑 Prevent modulo crash when array is empty
  if (!blogs.length) {
    return (
      <section className="py-16">
        <div className="text-center text-lg font-medium">
          Loading blogs...
        </div>
      </section>
    );
  }

  const visibleBlogs =
    blogs.length > 4
      ? [...blogs, ...blogs].slice(startIndex, startIndex + 4)
      : blogs;

  const formatDate = (dateString?: string) => {
  if (!dateString) return "No date";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};


  const handleMouseEnter = (blogId: string) => {
    setIsPaused(true);
    setHoveredCardId(blogId);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setHoveredCardId(null);
  };

  const goPrev = () => {
    if (!blogs.length) return;
    setStartIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const goNext = () => {
    if (!blogs.length) return;
    setStartIndex((prev) => (prev + 1) % blogs.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Blogs</h2>
          <p className="mt-2 text-lg max-w-3xl mx-auto">
            Explore our collection of thought-provoking articles, insightful
            tutorials, and industry updates.
          </p>
        </div>

        <div className="relative w-full max-w-screen-2xl mx-auto overflow-visible px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
            >
              {visibleBlogs.map((blog, index) => (
                <motion.div
                  key={`${blog._id}-${index}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                  onMouseEnter={() => handleMouseEnter(blog._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link to={`/blog/${blog._id}`} className="block h-full">
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 h-full flex flex-col rounded-xl relative">
                      <div className="relative h-64 w-full overflow-hidden">
                        <motion.img
                          src={blog.imageUrl}
                          alt={blog.heading}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: hoveredCardId === blog._id ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          onError={(e) => {
                            e.currentTarget.src = "/default-blog-image.jpg";
                          }}
                        />

                        <motion.div
                          className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
                          animate={{
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                            backgroundColor:
                              hoveredCardId === blog._id
                                ? "rgba(0,0,0,0.3)"
                                : "rgba(0,0,0,0)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-white p-3 rounded-full">
                            <Eye className="h-6 w-6 text-primary" />
                          </div>
                        </motion.div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">
                          {blog.heading}
                        </h3>

                        <motion.p
                          className="text-gray-600 line-clamp-2 mb-4 text-sm"
                          animate={{
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                          }}
                        >
                          {(blog.description ?? "").slice(0, 100)}
                          {(blog.description ?? "").length > 100 && "..."}
                        </motion.p>


                        <div className="mt-auto pt-2 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>

                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span className="truncate max-w-24">
                              {blog.name}
                            </span>
                          </div>
                        </div>

                        <motion.div
                          className="w-full mt-4"
                          animate={{
                            opacity: hoveredCardId === blog._id ? 1 : 0,
                            y: hoveredCardId === blog._id ? 0 : 20,
                          }}
                        >
                          <div className="text-primary font-medium text-center py-2 rounded-md border border-primary bg-primary/5 hover:bg-primary/10">
                            Read More
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
