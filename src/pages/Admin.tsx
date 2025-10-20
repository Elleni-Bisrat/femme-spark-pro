import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageCircle, Award, TrendingUp, UserCheck, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Admin = () => {
  const stats = [
    { label: "Total Users", value: "10,245", change: "+12%", icon: Users, color: "text-primary" },
    { label: "Active Mentors", value: "523", change: "+8%", icon: UserCheck, color: "text-secondary" },
    { label: "Community Posts", value: "3,421", change: "+24%", icon: MessageCircle, color: "text-accent" },
    { label: "Sessions Completed", value: "5,678", change: "+15%", icon: Award, color: "text-primary" },
  ];

  const recentUsers = [
    { name: "Emma Wilson", email: "emma@example.com", status: "Active", joined: "2 hours ago" },
    { name: "Sophie Brown", email: "sophie@example.com", status: "Active", joined: "5 hours ago" },
    { name: "Olivia Davis", email: "olivia@example.com", status: "Pending", joined: "1 day ago" },
  ];

  const flaggedContent = [
    { type: "Post", author: "User123", reason: "Spam", time: "1 hour ago" },
    { type: "Comment", author: "User456", reason: "Inappropriate", time: "3 hours ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage platform users, content, and analytics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly registered members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50"
                    >
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          <span
                            className={
                              user.status === "Active"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }
                          >
                            {user.status}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">{user.joined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Flagged Content
                </CardTitle>
                <CardDescription>Content requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.type} by {item.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Reason: {item.reason}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Growth Metrics
                </CardTitle>
                <CardDescription>Platform performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">User Engagement</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Mentor-Match Success</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary rounded-full h-2"
                        style={{ width: "92%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Platform Satisfaction</span>
                      <span className="text-sm text-muted-foreground">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent rounded-full h-2"
                        style={{ width: "95%" }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
