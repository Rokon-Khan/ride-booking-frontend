import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RiderDashboard = () => {
  const user = { role: "rider" as "rider" | "driver" | "admin" };

  return (
    <div className="container">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user.role}!</CardTitle>
          <CardDescription>Here are your account statistics.</CardDescription>
          <CardContent>
            <div className="pt-4">
              <h4 className="font-semibold mb-3">Account Statistics</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {user.role === "rider"
                      ? "24"
                      : user.role === "driver"
                      ? "156"
                      : "1,234"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.role === "rider"
                      ? "Rides Taken"
                      : user.role === "driver"
                      ? "Rides Completed"
                      : "Total Rides"}
                  </div>
                </div>

                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {user.role === "rider"
                      ? "4.8"
                      : user.role === "driver"
                      ? "4.9"
                      : "4.7"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                </div>

                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {user.role === "rider"
                      ? "$248"
                      : user.role === "driver"
                      ? "$3,456"
                      : "$125,890"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {user.role === "rider"
                      ? "Total Spent"
                      : user.role === "driver"
                      ? "Total Earned"
                      : "Platform Revenue"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default RiderDashboard;
