import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Users, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Mentors = () => {
  const mentors = [
    {
      name: "Dr. Lisa Anderson",
      initials: "LA",
      expertise: "E-commerce & Scaling",
      experience: "15+ years",
      rating: 4.9,
      sessions: 120,
      specialties: ["E-commerce", "Scaling", "Operations"]
    },
    {
      name: "Rachel Kim",
      initials: "RK",
      expertise: "Digital Marketing",
      experience: "10+ years",
      rating: 4.8,
      sessions: 95,
      specialties: ["Social Media", "SEO", "Content"]
    },
    {
      name: "Amanda Foster",
      initials: "AF",
      expertise: "Finance & Funding",
      experience: "12+ years",
      rating: 5.0,
      sessions: 78,
      specialties: ["Funding", "Financial Planning", "Pitch Decks"]
    },
    {
      name: "Jennifer Torres",
      initials: "JT",
      expertise: "Product Development",
      experience: "8+ years",
      rating: 4.7,
      sessions: 65,
      specialties: ["Product Strategy", "MVP", "User Research"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Find Your Mentor</h1>
          <p className="text-muted-foreground">
            Connect with experienced entrepreneurs who can guide your journey
          </p>
        </div>

        {/* Search */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by expertise, industry, or name..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">5K+</div>
              <div className="text-sm text-muted-foreground">Sessions Completed</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mentors.map((mentor, index) => (
            <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {mentor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="mb-1">{mentor.name}</CardTitle>
                    <CardDescription className="text-base font-medium text-foreground mb-2">
                      {mentor.expertise}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{mentor.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/5">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    Request Session
                  </Button>
                  <Button variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mentors;
