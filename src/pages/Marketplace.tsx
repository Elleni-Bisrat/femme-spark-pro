import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ShoppingBag, Star, Package } from "lucide-react";
import { useState } from "react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Digital Products", "Courses", "Handmade", "Services", "Consulting"];
  
  const products = [
    {
      id: 1,
      title: "Business Plan Template",
      description: "Comprehensive business plan template for startups",
      price: "$29",
      seller: "Sarah Johnson",
      category: "Digital Products",
      rating: 4.8,
      sales: 150,
    },
    {
      id: 2,
      title: "Social Media Marketing Course",
      description: "Learn to grow your business on social media",
      price: "$99",
      seller: "Emily Chen",
      category: "Courses",
      rating: 4.9,
      sales: 230,
    },
    {
      id: 3,
      title: "Handmade Jewelry Collection",
      description: "Unique handcrafted jewelry pieces",
      price: "$45",
      seller: "Maria Rodriguez",
      category: "Handmade",
      rating: 4.7,
      sales: 89,
    },
    {
      id: 4,
      title: "Brand Consulting Session",
      description: "1-hour brand strategy consultation",
      price: "$150",
      seller: "Lisa Thompson",
      category: "Consulting",
      rating: 5.0,
      sales: 67,
    },
    {
      id: 5,
      title: "Website Design Package",
      description: "Professional website design for small businesses",
      price: "$499",
      seller: "Anna Kim",
      category: "Services",
      rating: 4.9,
      sales: 120,
    },
    {
      id: 6,
      title: "Financial Planning Guide",
      description: "Step-by-step financial planning for entrepreneurs",
      price: "$39",
      seller: "Rachel Green",
      category: "Digital Products",
      rating: 4.6,
      sales: 180,
    },
  ];

  const stats = [
    { label: "Total Products", value: "150+", icon: Package },
    { label: "Active Sellers", value: "85", icon: ShoppingBag },
    { label: "Avg Rating", value: "4.8", icon: Star },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Marketplace
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover and sell products & services from our community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md mb-4 flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary/40" />
                </div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {product.seller.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{product.seller}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.sales})</span>
                    </div>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{product.price}</span>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Want to sell your products?</h3>
                <p className="text-muted-foreground mt-1">
                  Join our marketplace and reach thousands of potential customers
                </p>
              </div>
              <Button size="lg" className="whitespace-nowrap">
                Start Selling
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
