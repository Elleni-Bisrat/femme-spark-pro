import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Search, Plus, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Emma Johnson",
      initials: "EJ",
      topic: "Marketing Tips",
      title: "How I grew my Instagram to 10K in 3 months",
      excerpt: "Here are the strategies that worked for me...",
      likes: 24,
      replies: 8,
      trending: true,
      liked: false
    },
    {
      id: 2,
      author: "Sarah Chen",
      initials: "SC",
      topic: "Funding",
      title: "Successfully raised my first $50K",
      excerpt: "Want to share my experience with early-stage funding...",
      likes: 42,
      replies: 15,
      trending: true,
      liked: false
    },
    {
      id: 3,
      author: "Maya Patel",
      initials: "MP",
      topic: "Work-Life Balance",
      title: "Managing kids and business - my daily routine",
      excerpt: "Fellow mompreneurs, this might help you...",
      likes: 31,
      replies: 12,
      trending: false,
      liked: false
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    topic: "Getting Started"
  });

  const categories = [
    "All Topics",
    "Getting Started",
    "Marketing",
    "Funding",
    "Work-Life Balance",
    "Success Stories"
  ];

  // Handle like/unlike a post
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Handle category filter
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Topics" || post.topic === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle new post creation
  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You", // This would come from user context in real app
        initials: "Y", // This would come from user context
        topic: newPost.topic,
        title: newPost.title,
        excerpt: newPost.content.substring(0, 100) + "...",
        likes: 0,
        replies: 0,
        trending: false,
        liked: false
      };
      
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", topic: "Getting Started" });
      setIsCreatingPost(false);
    }
  };

  // Handle post click (view post details)
  const handlePostClick = (postId: number) => {
    // In a real app, this would navigate to the post detail page
    console.log(`Navigating to post ${postId}`);
    // Example: router.push(`/community/post/${postId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">SheCircle Community</h1>
            <p className="text-muted-foreground">
              Connect, share, and grow together
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsCreatingPost(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category, index) => (
                <Badge
                  key={index}
                  variant={category === selectedCategory ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create New Post Modal */}
        {isCreatingPost && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              />
              <select 
                className="w-full p-2 border rounded-md"
                value={newPost.topic}
                onChange={(e) => setNewPost({...newPost, topic: e.target.value})}
              >
                {categories.filter(cat => cat !== "All Topics").map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Textarea
                placeholder="What would you like to share?"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                rows={4}
              />
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreatingPost(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id} 
              className="border-border/50 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {post.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      {post.trending && (
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {post.topic}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button 
                    className={`flex items-center gap-1 transition-colors ${
                      post.liked ? "text-red-500" : "hover:text-primary"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.id);
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Community;