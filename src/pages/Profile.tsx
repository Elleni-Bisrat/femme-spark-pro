import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Settings, User } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Profile = () => {
  const achievements = [
    { title: "Early Adopter", description: "Joined in the first month", icon: "🌟" },
    { title: "Active Learner", description: "Completed 5 courses", icon: "📚" },
    { title: "Community Star", description: "100+ helpful replies", icon: "⭐" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and showcase your journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-border/50">
            <CardContent className="pt-6 text-center space-y-4">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Sarah Johnson</h3>
                <p className="text-muted-foreground">E-commerce Entrepreneur</p>
              </div>
              <div className="flex gap-2 justify-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Pro Member
                </Badge>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">
                  <User className="h-4 w-4 mr-2" />
                  Info
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Award className="h-4 w-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sarah@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        defaultValue="Passionate about building my e-commerce business and helping other women succeed."
                        rows={4}
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>Milestones you've unlocked</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-border/50"
                      >
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
