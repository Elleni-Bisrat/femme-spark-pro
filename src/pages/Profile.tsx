

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Settings, User, Camera, Save, Eye, EyeOff } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useRef } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    bio: "Passionate about building my e-commerce business and helping other women succeed.",
    title: "E-commerce Entrepreneur",
    avatarInitials: "SJ",
    avatarUrl: "",
    role: "mentee" // Can be 'mentee', 'user', or 'mentor' based on signup
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

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Handle avatar upload
  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and upload
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      
      // Update profile data with new avatar
      setProfileData(prev => ({
        ...prev,
        avatarUrl: imageUrl,
        avatarInitials: prev.avatarInitials // Keep initials as fallback
      }));
      

      // In a real application, you would upload the file to your server here
      console.log("Avatar file selected:", file);
      
      // Simulate upload process
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        alert("Avatar uploaded successfully!");
      }, 1000);
    }
  };

  // Get role badge color based on role
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'mentor':
        return 'default';
      case 'mentee':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // Get role display text
  const getRoleDisplayText = (role: string) => {
    switch (role) {
      case 'mentor':
        return 'Mentor';
      case 'mentee':
        return 'Mentee';
      default:
        return 'User';
    }
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
      avatarInitials: "SJ",
      avatarUrl: "",
      role: "mentee"
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
                  {profileData.avatarUrl ? (
                    <AvatarImage 
                      src={profileData.avatarUrl} 
                      alt={`${profileData.firstName} ${profileData.lastName}`}
                    />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                    {profileData.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  onClick={handleAvatarUpload}
                  disabled={isSaving}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-muted-foreground">{profileData.title}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <Badge 
                  variant={getRoleBadgeVariant(profileData.role)} 
                  className={profileData.role === 'mentor' ? 'bg-primary/10 text-primary' : ''}
                >
                  {getRoleDisplayText(profileData.role)}
                </Badge>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={toggleEditMode}
                disabled={isSaving}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
                {isSaving && " (Saving...)"}
              </Button>
            </CardContent>
          </Card>
          

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">
                  <User className="h-4 w-4 mr-2" />
                  Info
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
