import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTroubleNotificationQuery } from "@/redux/features/auth/authApi";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Clock, Mail, MapPin, User } from "lucide-react";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  riderName: string;
  riderEmail: string;
  rideId: string;
  location: {
    lat: number;
    lng: number;
  };
  isRead: boolean;
  timestamp: string;
}

export default function NotificationAlert() {
  const { data: notificationsData, isLoading } = useTroubleNotificationQuery(
    undefined,
    {
      pollingInterval: 10000, // Poll every 5 seconds for real-time updates
    }
  );

  const notifications: Notification[] = notificationsData?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">SOS Notifications</h1>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">SOS Emergency Alerts</h1>
        <p className="text-muted-foreground">
          Real-time emergency notifications from riders
        </p>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No SOS alerts at the moment
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification._id}
              className="border-l-4 border-l-red-500"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    {notification.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <Badge variant="destructive">New</Badge>
                    )}
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(notification.timestamp), {
                        addSuffix: true,
                      })}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{notification.message}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Rider Information
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {notification.riderName}
                      </p>
                      <p className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span className="font-medium">Email:</span>{" "}
                        {notification.riderEmail}
                      </p>
                      <p>
                        <span className="font-medium">Ride ID:</span>{" "}
                        {notification.rideId}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Latitude:</span>{" "}
                        {notification.location.lat}
                      </p>
                      <p>
                        <span className="font-medium">Longitude:</span>{" "}
                        {notification.location.lng}
                      </p>
                      <a
                        href={`https://maps.google.com/?q=${notification.location.lat},${notification.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
