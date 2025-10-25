import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, ShoppingBag, Star, Package, Heart, Plus, Upload, X, Calendar, User, Shield, Download, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [sellerForm, setSellerForm] = useState({
    productName: "",
    description: "",
    category: "Digital Products",
    price: "",
    tags: [] as string[],
    tagInput: ""
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Business Plan Template",
      description: "Comprehensive business plan template for startups",
      price: "$29",
      seller: "Sarah Johnson",
      category: "Digital Products",
      rating: 4.8,
      sales: 150,
      reviews: 42,
      liked: false,
      detailedDescription: "This comprehensive business plan template includes everything you need to create a professional business plan that will impress investors and guide your startup journey. Features include financial projections, market analysis, executive summary, and more.",
      features: ["Financial Projections", "Market Analysis", "Executive Summary", "SWOT Analysis", "Marketing Strategy"],
      requirements: "Microsoft Word or Google Docs",
      includes: ["Template File", "Instruction Guide", "Examples", "Financial Calculator"],
      lastUpdated: "2024-01-15"
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
      reviews: 89,
      liked: false,
      detailedDescription: "Master social media marketing with this comprehensive course that covers all major platforms. Learn proven strategies to grow your audience, create engaging content, and convert followers into customers.",
      features: ["Video Lessons", "Workbooks", "Case Studies", "Community Access", "Certificate"],
      requirements: "Basic computer knowledge",
      includes: ["12 Modules", "50+ Videos", "Templates", "Lifetime Access"],
      lastUpdated: "2024-02-01"
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
      reviews: 23,
      liked: false,
      detailedDescription: "Each piece in this collection is handcrafted with care using high-quality materials. Our jewelry features unique designs that combine modern elegance with artisanal craftsmanship.",
      features: ["Handmade", "Premium Materials", "Unique Designs", "Gift Packaging"],
      requirements: "None",
      includes: ["Jewelry Piece", "Gift Box", "Care Instructions"],
      lastUpdated: "2024-01-20"
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
      reviews: 15,
      liked: false,
      detailedDescription: "Get personalized brand strategy advice from an experienced consultant. We'll analyze your current brand positioning and provide actionable recommendations to strengthen your brand identity.",
      features: ["1-on-1 Session", "Brand Audit", "Strategy Recommendations", "Follow-up Report"],
      requirements: "Business concept or existing brand",
      includes: ["60min Consultation", "Written Report", "Resource List"],
      lastUpdated: "2024-01-10"
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
      reviews: 34,
      liked: false,
      detailedDescription: "Complete website design package tailored for small businesses. Includes responsive design, SEO optimization, and content management system setup.",
      features: ["Responsive Design", "SEO Optimized", "CMS Setup", "3 Revisions", "Training"],
      requirements: "Content and branding materials",
      includes: ["5 Pages", "Mobile Optimization", "Basic SEO", "1 Year Support"],
      lastUpdated: "2024-01-25"
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
      reviews: 56,
      liked: false,
      detailedDescription: "This comprehensive guide helps entrepreneurs manage their finances effectively. Includes budgeting templates, investment strategies, and tax planning tips specifically for business owners.",
      features: ["Budget Templates", "Investment Strategies", "Tax Planning", "Cash Flow Management"],
      requirements: "Basic spreadsheet knowledge",
      includes: ["PDF Guide", "Excel Templates", "Resource Library"],
      lastUpdated: "2024-01-18"
    },
  ]);

  const categories = ["All", "Digital Products", "Courses", "Handmade", "Services", "Consulting"];
  
  const stats = [
    { label: "Total Products", value: "150+", icon: Package },
    { label: "Active Sellers", value: "85", icon: ShoppingBag },
    { label: "Avg Rating", value: "4.8", icon: Star },
  ];

  // Handle category filter
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          liked: !product.liked
        };
      }
      return product;
    }));

    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle product click (view details)
  const handleProductClick = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
  };

  // Handle "View Details" button click
  const handleViewDetails = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
  };

  // Handle close product details
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  // Handle Start Selling
  const handleStartSelling = () => {
    setShowSellerModal(true);
  };

  // Handle form input changes
  const handleFormChange = (field: string, value: string) => {
    setSellerForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (sellerForm.tagInput.trim() && !sellerForm.tags.includes(sellerForm.tagInput.trim())) {
      setSellerForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ""
      }));
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setSellerForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Handle tag input key press
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // Handle form submission
  const handleSubmitProduct = () => {
    if (sellerForm.productName && sellerForm.description && sellerForm.price) {
      const newProduct = {
        id: products.length + 1,
        title: sellerForm.productName,
        description: sellerForm.description,
        price: `$${sellerForm.price}`,
        seller: "You",
        category: sellerForm.category,
        rating: 0,
        sales: 0,
        reviews: 0,
        liked: false,
        detailedDescription: sellerForm.description,
        features: sellerForm.tags,
        requirements: "None specified",
        includes: ["Product File", "Support"],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setProducts([newProduct, ...products]);
      setSellerForm({
        productName: "",
        description: "",
        category: "Digital Products",
        price: "",
        tags: [],
        tagInput: ""
      });
      setShowSellerModal(false);
    }
  };

  // Handle purchase product
  const handlePurchase = (productId: number) => {
    console.log(`Purchasing product ${productId}`);
    // In real app: handle payment processing
    alert(`Thank you for your purchase! You've bought: ${selectedProduct?.title}`);
    handleCloseDetails();
  };

  // Handle contact seller
  const handleContactSeller = () => {
    console.log(`Contacting seller: ${selectedProduct?.seller}`);
    // In real app: open messaging interface
    alert(`Opening chat with ${selectedProduct?.seller}`);
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
                variant={category === selectedCategory ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer relative"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Wishlist Heart */}
              <button 
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                onClick={(e) => handleWishlistToggle(product.id, e)}
              >
                <Heart 
                  className={`h-4 w-4 ${product.liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
                />
              </button>

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
                <Button 
                  onClick={(e) => handleViewDetails(product.id, e)}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl">{selectedProduct.title}</CardTitle>
                      <Badge variant="secondary">{selectedProduct.category}</Badge>
                    </div>
                    <CardDescription className="text-lg">
                      {selectedProduct.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseDetails}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Product Image & Basic Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Package className="h-24 w-24 text-primary/40" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary">{selectedProduct.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-accent text-accent" />
                        <span className="font-medium">{selectedProduct.rating}</span>
                        <span className="text-sm text-muted-foreground">({selectedProduct.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {selectedProduct.seller.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedProduct.seller}</p>
                        <p className="text-sm text-muted-foreground">{selectedProduct.sales} sales</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="lg" 
                        className="flex-1"
                        onClick={() => handlePurchase(selectedProduct.id)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Purchase Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={handleContactSeller}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>Instant Download</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground">{selectedProduct.detailedDescription}</p>
                </div>

                {/* Features */}
                {selectedProduct.features && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProduct.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {selectedProduct.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                    <p className="text-muted-foreground">{selectedProduct.requirements}</p>
                  </div>
                )}

                {/* Product Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{selectedProduct.lastUpdated}</p>
                  </div>
                  <div className="text-center">
                    <User className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Sales</p>
                    <p className="font-medium">{selectedProduct.sales}</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-medium">{selectedProduct.rating}/5</p>
                  </div>
                  <div className="text-center">
                    <Package className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 justify-between border-t pt-6">
                <Button variant="outline" onClick={handleCloseDetails}>
                  Back to Marketplace
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant={selectedProduct.liked ? "default" : "outline"}
                    onClick={(e) => handleWishlistToggle(selectedProduct.id, e)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${selectedProduct.liked ? "fill-current" : ""}`} />
                    {selectedProduct.liked ? "Saved" : "Save"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Seller Modal */}
        {showSellerModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>List Your Product</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSellerModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Fill in the details about your product or service
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Product Name *
                  </label>
                  <Input
                    placeholder="e.g., Social Media Marketing Course"
                    value={sellerForm.productName}
                    onChange={(e) => handleFormChange("productName", e.target.value)}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description *
                  </label>
                  <textarea
                    className="w-full p-3 border rounded-md resize-none"
                    rows={4}
                    placeholder="Describe your product or service in detail..."
                    value={sellerForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Category *
                    </label>
                    <select 
                      className="w-full p-3 border rounded-md"
                      value={sellerForm.category}
                      onChange={(e) => handleFormChange("category", e.target.value)}
                    >
                      {categories.filter(cat => cat !== "All").map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={sellerForm.price}
                        onChange={(e) => handleFormChange("price", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add tags..."
                      value={sellerForm.tagInput}
                      onChange={(e) => handleFormChange("tagInput", e.target.value)}
                      onKeyPress={handleTagKeyPress}
                    />
                    <Button type="button" onClick={handleAddTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sellerForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Image Upload (Placeholder) */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop images here or click to upload
                    </p>
                    <Button variant="outline" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSellerModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitProduct}
                  disabled={!sellerForm.productName || !sellerForm.description || !sellerForm.price}
                >
                  List Product
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

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
              <Button size="lg" className="whitespace-nowrap" onClick={handleStartSelling}>
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