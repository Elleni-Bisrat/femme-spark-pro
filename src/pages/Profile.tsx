import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Settings, User, Camera, Save, Eye, EyeOff } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    bio: "Passionate about building my e-commerce business and helping other women succeed.",
    title: "E-commerce Entrepreneur",
    avatarInitials: "SJ"
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const achievements = [
    { title: "Early Adopter", description: "Joined in the first month", icon: "🌟", unlocked: true },
    { title: "Active Learner", description: "Completed 5 courses", icon: "📚", unlocked: true },
    { title: "Community Star", description: "100+ helpful replies", icon: "⭐", unlocked: true },
    { title: "Marketplace Seller", description: "Sold 10+ products", icon: "🛍️", unlocked: false },
    { title: "Mentor", description: "Helped 5+ members", icon: "👥", unlocked: false },
  ];

  // Handle profile data changes
  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle password data changes
  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Profile saved:", profileData);
    setIsEditing(false);
    setIsSaving(false);
    
    // Show success message
    alert("Profile updated successfully!");
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Password updated");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsSaving(false);
    
    // Show success message
    alert("Password updated successfully!");
  };

  // Handle avatar upload (simulated)
  const handleAvatarUpload = () => {
    // In real app, this would open a file picker and upload the image
    console.log("Avatar upload triggered");
    alert("Avatar upload feature would open here!");
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    // Reset to original data
    setProfileData({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah@example.com",
      bio: "Passionate about building my e-commerce business and helping other women succeed.",
      title: "E-commerce Entrepreneur",
      avatarInitials: "SJ"
    });
    setIsEditing(false);
  };

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
              <div className="relative inline-block">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                    {profileData.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  onClick={handleAvatarUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-muted-foreground">{profileData.title}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Pro Member
                </Badge>
                <Badge variant="outline">Since 2024</Badge>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={toggleEditMode}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <CardDescription>
                      {isEditing ? "Update your personal details" : "Your personal information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={profileData.firstName}
                          onChange={(e) => handleProfileChange("firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={profileData.lastName}
                          onChange={(e) => handleProfileChange("lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input 
                        id="title" 
                        value={profileData.title}
                        onChange={(e) => handleProfileChange("title", e.target.value)}
                        disabled={!isEditing}
                        placeholder="E.g., E-commerce Entrepreneur"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange("bio", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button 
                          className="bg-primary hover:bg-primary/90"
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                        >
                          <Save className="h-4 w-4 mr-2" />
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <CardDescription>Milestones you've unlocked on your journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-lg border border-border/50 transition-all ${
                            achievement.unlocked 
                              ? "bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10" 
                              : "bg-muted/30 opacity-60"
                          }`}
                        >
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            <Badge 
                              variant={achievement.unlocked ? "default" : "secondary"} 
                              className="mt-2 text-xs"
                            >
                              {achievement.unlocked ? "Unlocked" : "Locked"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Password Change Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Change Password</h4>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword" 
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input 
                              id="newPassword" 
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input 
                              id="confirmPassword" 
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button 
                        className="bg-primary hover:bg-primary/90"
                        onClick={handleUpdatePassword}
                        disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      >
                        {isSaving ? "Updating..." : "Update Password"}
                      </Button>
                    </div>

                    {/* Account Actions Section */}
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-semibold text-destructive">Danger Zone</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10">
                          Deactivate Account
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Temporarily deactivate your account. You can reactivate it later.
                        </p>
                      </div>
                    </div>
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