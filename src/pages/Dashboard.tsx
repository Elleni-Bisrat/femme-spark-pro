import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, MessageCircle, TrendingUp, Award, Calendar, Plus, Target, Rocket, Star } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [growthProgress, setGrowthProgress] = useState(0); // Set to 0 at beginning
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: "course", title: "Completed Social Media Marketing", time: "2 hours ago", completed: true },
    { id: 2, type: "connection", title: "Connected with Dr. Lisa Anderson", time: "1 day ago", completed: true },
    { id: 3, type: "community", title: "Posted in Community Forum", time: "2 days ago", completed: true },
    { id: 4, type: "workshop", title: "Upcoming: Funding Strategies", time: "Tomorrow", completed: false },
    { id: 5, type: "goal", title: "Set new goal: Launch E-commerce Store", time: "3 days ago", completed: false },
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: "Launch E-commerce Store", status: "in-progress", deadline: "2024-03-15", active: true },
    { id: 2, title: "Complete Business Plan", status: "not-done", deadline: "2024-02-28", active: true },
    { id: 3, title: "Secure First 10 Customers", status: "not-done", deadline: "2024-04-01", active: true },
  ]);

  const [newGoal, setNewGoal] = useState({ title: "", deadline: "" });
  const [showAddGoal, setShowAddGoal] = useState(false);

  const quickActions = [
    { 
      icon: Users, 
      label: "Find a Mentor", 
      href: "/mentors", 
      color: "text-primary",
      description: "Connect with expert mentors"
    },
    { 
      icon: MessageCircle, 
      label: "Join Community", 
      href: "/community", 
      color: "text-secondary",
      description: "Engage with other entrepreneurs"
    },
    { 
      icon: Calendar, 
      label: "Book Workshop", 
      href: "/workshops", 
      color: "text-primary",
      description: "Join live sessions"
    },
  ];

  // Simulate progress increase over time
  useEffect(() => {
    const interval = setInterval(() => {
      setGrowthProgress(prev => {
        if (prev < 100) {
          return Math.min(prev + 1, 100);
        }
        return prev;
      });
    }, 30000); // Increase every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle quick action clicks
  const handleQuickAction = (href: string) => {
    console.log(`Navigating to: ${href}`);
    // In real app: router.push(href);
    alert(`Navigating to ${href}`);
  };

  // Handle new goal input
  const handleNewGoalChange = (field: string, value: string) => {
    setNewGoal(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new goal
  const handleAddGoal = () => {
    if (newGoal.title.trim() && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        title: newGoal.title,
        status: "not-done",
        deadline: newGoal.deadline,
        active: true
      };
      
      setGoals(prev => [...prev, goal]);
      setNewGoal({ title: "", deadline: "" });
      setShowAddGoal(false);
      
      // Add to recent activity
      setRecentActivity(prev => [
        {
          id: Date.now(),
          type: "goal",
          title: `Set new goal: ${newGoal.title}`,
          time: "Just now",
          completed: false
        },
        ...prev
      ]);
    }
  };

  // Update goal status
  const updateGoalStatus = (goalId: number, newStatus: string) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, status: newStatus }
          : goal
      )
    );

    // Update recent activity when goal status changes
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setRecentActivity(prev => [
        {
          id: Date.now(),
          type: "goal",
          title: `Updated goal: ${goal.title} - ${newStatus}`,
          time: "Just now",
          completed: newStatus === "done"
        },
        ...prev
      ]);
    }
  };

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "done": return "bg-green-500";
      case "in-progress": return "bg-yellow-500";
      case "not-done": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Continue your entrepreneurial journey.
            </p>
          </div>
        </div>

        {/* Stats Grid - Single Card for Market Progress */}
        <div className="grid grid-cols-1 gap-4">
          {/* Growth Progress - Renamed to Market Progress */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                Your Market Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next Level</span>
                  <span className="font-semibold">{growthProgress}%</span>
                </div>
                <Progress value={growthProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>What would you like to do today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-4 flex-col gap-2 hover:bg-muted transition-all hover:scale-105"
                      onClick={() => handleQuickAction(action.href)}
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-sm font-medium">{action.label}</span>
                      <span className="text-xs text-muted-foreground">{action.description}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Your Goals
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddGoal(!showAddGoal)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Track your business objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Goal Form */}
                {showAddGoal && (
                  <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
                    <input
                      type="text"
                      placeholder="Goal title..."
                      className="w-full p-2 border rounded-md"
                      value={newGoal.title}
                      onChange={(e) => handleNewGoalChange("title", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="flex-1 p-2 border rounded-md"
                        value={newGoal.deadline}
                        onChange={(e) => handleNewGoalChange("deadline", e.target.value)}
                      />
                      <Button onClick={handleAddGoal} size="sm">
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAddGoal(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Goals List */}
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{goal.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {getDaysUntilDeadline(goal.deadline)} days left
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={goal.status}
                          onChange={(e) => updateGoalStatus(goal.id, e.target.value)}
                          className="p-2 border rounded-md text-sm"
                        >
                          <option value="not-done">Not Done</option>
                          <option value="in-progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(goal.status)}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity - Limited to 5 items */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-secondary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest achievements and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border/50"
                    >
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          activity.completed ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;