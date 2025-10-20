import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, MessageCircle, TrendingUp, Award, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const growthProgress = 65;

  const quickActions = [
    { icon: Users, label: "Find a Mentor", href: "/mentors", color: "text-primary" },
    { icon: MessageCircle, label: "Join SheCircle", href: "/community", color: "text-secondary" },
    { icon: BookOpen, label: "Browse Courses", href: "#", color: "text-accent" },
    { icon: Calendar, label: "Book Workshop", href: "#", color: "text-primary" },
  ];

  const milestones = [
    { title: "Profile Completed", completed: true },
    { title: "First Connection Made", completed: true },
    { title: "Attended Workshop", completed: false },
    { title: "Launched First Product", completed: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
          <p className="text-muted-foreground">
            Continue your entrepreneurial journey
          </p>
        </div>

        {/* Growth Progress */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Growth Journey
            </CardTitle>
            <CardDescription>You're making great progress!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Next Milestone</span>
                <span className="font-semibold">{growthProgress}%</span>
              </div>
              <Progress value={growthProgress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Hours Learned</div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary">5</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-6 flex-col gap-2 hover:bg-muted"
                  onClick={() => window.location.href = action.href}
                >
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Your Milestones
            </CardTitle>
            <CardDescription>Track your entrepreneurial achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      milestone.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border-2 border-border"
                    }`}
                  >
                    {milestone.completed && "✓"}
                  </div>
                  <span
                    className={
                      milestone.completed
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
