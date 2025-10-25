import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, MessageCircle, Sparkles, Target } from "lucide-react";
import heroImage from "@/assets/hero-entrepreneur.jpg";

const Landing = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Guided Growth",
      description: "Step-by-step pathways tailored to your entrepreneurial journey"
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Connect with experienced entrepreneurs who understand your challenges"
    },
    {
      icon: MessageCircle,
      title: "SheCircle Community",
      description: "Join a supportive network of ambitious women building their dreams"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Access curated courses, workshops, and materials for every stage"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SheRise
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Empower Your
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Entrepreneurial Journey
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Join a thriving community of women entrepreneurs. Get mentorship, 
                learn new skills, and grow your business from home.
              </p>
              <div className="flex gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Start Your Journey
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Women Entrepreneurs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Expert Mentors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Woman entrepreneur working from home" 
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground">
              Tools and support designed specifically for women entrepreneurs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10" />
        <div className="container mx-auto px-4 relative">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center space-y-6">
              <Target className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-4xl font-bold">Ready to Start Growing?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of women who are building successful businesses from home. 
                Your entrepreneurial journey starts here.
              </p>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 SheGrow. Empowering women entrepreneurs worldwide.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
