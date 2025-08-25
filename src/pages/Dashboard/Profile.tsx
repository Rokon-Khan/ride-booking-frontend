/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Edit3, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);

    try {
      const success = await updateProfile(data);
      if (success) {
        toast.success("Your profile has been successfully updated.");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "driver":
        return "secondary";
      case "rider":
        return "default";
      default:
        return "default";
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-medium">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-hero text-white">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary-dark"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {user.name}
                </h3>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
                {user.isVerified && (
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-600"
                  >
                    Verified Account
                  </Badge>
                )}
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full btn-cta">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <FormLabel>Email</FormLabel>
                        <Input
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Email cannot be changed
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 btn-cta"
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-foreground font-medium">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Address</span>
              </div>
              <p className="text-foreground font-medium">
                {user.address || "Not provided"}
              </p>
            </div>

            <div className="pt-4 border-t">
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
        </Card>
      </div>
    </div>
  );
};

export default Profile;
