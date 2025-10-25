import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Users, Calendar, Filter, X, Clock, MessageCircle, BookOpen } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [sessionRequest, setSessionRequest] = useState({
    mentorId: null as number | null,
    topic: "",
    date: "",
    time: "",
    duration: "30",
    message: ""
  });

  const allSpecialties = ["E-commerce", "Scaling", "Operations", "Social Media", "SEO", "Content", "Funding", "Financial Planning", "Pitch Decks", "Product Strategy", "MVP", "User Research"];

  const mentors = [
    {
      id: 1,
      name: "Dr. Lisa Anderson",
      initials: "LA",
      expertise: "E-commerce & Scaling",
      experience: "15+ years",
      rating: 4.9,
      sessions: 120,
      specialties: ["E-commerce", "Scaling", "Operations"],
      bio: "Former VP of E-commerce at major retail company. Helped 50+ businesses scale their online presence.",
      availability: ["Mon", "Wed", "Fri"],
      responseTime: "2 hours",
      price: "$150/hr"
    },
    {
      id: 2,
      name: "Rachel Kim",
      initials: "RK",
      expertise: "Digital Marketing",
      experience: "10+ years",
      rating: 4.8,
      sessions: 95,
      specialties: ["Social Media", "SEO", "Content"],
      bio: "Digital marketing expert with proven track record of growing brands on social media platforms.",
      availability: ["Tue", "Thu", "Sat"],
      responseTime: "4 hours",
      price: "$120/hr"
    },
    {
      id: 3,
      name: "Amanda Foster",
      initials: "AF",
      expertise: "Finance & Funding",
      experience: "12+ years",
      rating: 5.0,
      sessions: 78,
      specialties: ["Funding", "Financial Planning", "Pitch Decks"],
      bio: "Investment banker turned entrepreneur. Specialized in helping women secure funding.",
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      responseTime: "1 hour",
      price: "$200/hr"
    },
    {
      id: 4,
      name: "Jennifer Torres",
      initials: "JT",
      expertise: "Product Development",
      experience: "8+ years",
      rating: 4.7,
      sessions: 65,
      specialties: ["Product Strategy", "MVP", "User Research"],
      bio: "Product manager with experience in both startups and enterprise companies.",
      availability: ["Wed", "Thu", "Fri"],
      responseTime: "6 hours",
      price: "$130/hr"
    }
  ];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle specialty filter
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSpecialties([]);
    setSearchQuery("");
  };

  // Filter mentors based on search and specialties
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialties = selectedSpecialties.length === 0 || 
      selectedSpecialties.some(specialty => mentor.specialties.includes(specialty));

    return matchesSearch && matchesSpecialties;
  });

  // Handle request session
  const handleRequestSession = (mentorId: number) => {
    setSessionRequest({
      mentorId,
      topic: "",
      date: "",
      time: "",
      duration: "30",
      message: ""
    });
  };

  // Handle session request change
  const handleSessionRequestChange = (field: string, value: string) => {
    setSessionRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit session request
  const handleSubmitSessionRequest = () => {
    if (sessionRequest.topic && sessionRequest.date && sessionRequest.time) {
      const mentor = mentors.find(m => m.id === sessionRequest.mentorId);
      console.log("Session request submitted:", {
        ...sessionRequest,
        mentor: mentor?.name
      });
      
      // Show success message
      alert(`Session request sent to ${mentor?.name}! They will respond within ${mentor?.responseTime}.`);
      
      // Reset form
      setSessionRequest({
        mentorId: null,
        topic: "",
        date: "",
        time: "",
        duration: "30",
        message: ""
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // View mentor profile
  const handleViewProfile = (mentor: any) => {
    setSelectedMentor(mentor);
  };

  // Close mentor profile
  const handleCloseProfile = () => {
    setSelectedMentor(null);
  };

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

        {/* Search and Filters */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by expertise, industry, or name..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {selectedSpecialties.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedSpecialties.length}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Filter by Specialty</h4>
                  {selectedSpecialties.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allSpecialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => toggleSpecialty(specialty)}
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{mentors.length}+</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {mentors.reduce((acc, mentor) => acc + mentor.sessions, 0)}+
              </div>
              <div className="text-sm text-muted-foreground">Sessions Completed</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="pt-6 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {(mentors.reduce((acc, mentor) => acc + mentor.rating, 0) / mentors.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="border-border/50 hover:shadow-lg transition-shadow">
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
                      <span>•</span>
                      <span>{mentor.experience}</span>
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
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleRequestSession(mentor.id)}
                  >
                    Request Session
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleViewProfile(mentor)}
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMentors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Session Request Modal */}
        {sessionRequest.mentorId && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Request Session</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSessionRequest(prev => ({ ...prev, mentorId: null }))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Book a session with {mentors.find(m => m.id === sessionRequest.mentorId)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic *</label>
                  <Input
                    placeholder="What would you like to discuss?"
                    value={sessionRequest.topic}
                    onChange={(e) => handleSessionRequestChange("topic", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date *</label>
                    <Input
                      type="date"
                      value={sessionRequest.date}
                      onChange={(e) => handleSessionRequestChange("date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time *</label>
                    <Input
                      type="time"
                      value={sessionRequest.time}
                      onChange={(e) => handleSessionRequestChange("time", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={sessionRequest.duration}
                    onChange={(e) => handleSessionRequestChange("duration", e.target.value)}
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Message</label>
                  <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    rows={3}
                    placeholder="Any specific questions or topics you'd like to cover?"
                    value={sessionRequest.message}
                    onChange={(e) => handleSessionRequestChange("message", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardContent>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleSubmitSessionRequest}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mentor Profile Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {selectedMentor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedMentor.name}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground">
                        {selectedMentor.expertise}
                      </CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="font-semibold">{selectedMentor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{selectedMentor.sessions} sessions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedMentor.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseProfile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground">{selectedMentor.bio}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.specialties.map((specialty: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Availability</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMentor.availability.map((day: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-muted-foreground">{selectedMentor.responseTime}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleRequestSession(selectedMentor.id)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Book Session - {selectedMentor.price}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Mentors;