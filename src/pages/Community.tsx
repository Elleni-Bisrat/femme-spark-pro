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

  const posts = [
    {
      id: 1,
      author: "Emma Johnson",
      initials: "EJ",
      topic: "Marketing Tips",
      title: "How I grew my Instagram to 10K in 3 months",
      excerpt: "Here are the strategies that worked for me...",
      likes: 24,
      replies: 8,
      trending: true
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
      trending: true
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
      trending: false
    }
  ];

  const categories = [
    "All Topics",
    "Getting Started",
    "Marketing",
    "Funding",
    "Work-Life Balance",
    "Success Stories"
  ];

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
          <Button className="bg-primary hover:bg-primary/90">
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
                  variant={index === 0 ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-border/50 hover:shadow-md transition-shadow cursor-pointer">
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
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
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
