/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Camera,
  Car,
  Edit3,
  Hash,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useAuth } from "@/hooks/useAuth";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useUpdateMeMutation } from "@/redux/features/auth/authApi";
import {
  useUpdateVehicleDetailsMutation,
  useVehicleDetailsQuery,
} from "@/redux/features/driver/driverApi";

// schema for profile
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  avatarUrl: z.string().optional(),
});

// schema for driver vehicle
const vehicleSchema = z.object({
  model: z.string().min(3, "Model must be at least 3 characters"),
  licensePlate: z.string().min(3, "License plate is required"),
});

// Define a union type for the form data
type RiderFormData = z.infer<typeof profileSchema>;
type DriverFormData = z.infer<typeof profileSchema> &
  z.infer<typeof vehicleSchema>;
type FormData = RiderFormData | DriverFormData;

const Profile = () => {
  // const { data: user, isLoading } = useUserInfoQuery(undefined);
  const { user } = useAuth();
  const [updateMe] = useUpdateMeMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadImage, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch driver vehicle info if role=driver
  const { data: vehicle, isLoading: isVehicleLoading } = useVehicleDetailsQuery(
    undefined,
    { skip: user?.role !== "driver" }
  );

  const [updateVehicleDetails] = useUpdateVehicleDetailsMutation();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  // Use the correct schema based on user role
  const formSchema =
    user?.role === "driver"
      ? profileSchema.merge(vehicleSchema)
      : profileSchema;

  const profileForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatarUrl: undefined,
      ...(user?.role === "driver"
        ? {
            model: "",
            licensePlate: "",
          }
        : {}),
    } as any,
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.profile?.name || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        avatarUrl: user.profile?.avatarUrl || undefined,
        ...(user.role === "driver" && vehicle
          ? {
              model: vehicle.model || "",
              licensePlate: vehicle.licensePlate || "",
            }
          : {}),
      });
    }
  }, [user, vehicle, profileForm]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const url = await uploadImage(file);
        if (url) {
          profileForm.setValue("avatarUrl", url);
          toast.success("Image uploaded successfully");
        }
      } catch {
        setPreviewUrl(undefined);
        toast.error("Failed to upload image");
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsUpdating(true);
    try {
      const profileData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        avatarUrl: data.avatarUrl,
      };
      await updateMe(profileData).unwrap();

      if (
        user?.role === "driver" &&
        "model" in data &&
        "licensePlate" in data
      ) {
        const vehicleData = {
          model: data.model as string,
          licensePlate: data.licensePlate as string,
        };
        await updateVehicleDetails({ body: vehicleData }).unwrap();
      }

      toast.success("Profile updated successfully");
      setIsDialogOpen(false);
      setPreviewUrl(undefined);
    } catch {
      toast.error("Failed to update profile");
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

  // if (isLoading || !user) return <p>Loading...</p>;

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
              <Avatar className="h-24 w-24 border-4 border-background shadow-medium">
                <AvatarImage
                  src={user?.profile?.avatarUrl}
                  alt={user.profile?.name}
                />
                <AvatarFallback>
                  {user?.profile?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{user.profile?.name}</h3>
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
                {user.isEmailVerified && (
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
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                  </DialogHeader>

                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <Avatar
                        className="h-24 w-24 cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <AvatarImage
                          src={previewUrl || user?.profile?.avatarUrl}
                          alt={user.profile?.name}
                        />
                        <AvatarFallback>
                          {user?.profile?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatarUpload"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                      />
                      <Button
                        size="icon"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary-dark cursor-pointer"
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={profileForm.control}
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
                        control={profileForm.control}
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
                        control={profileForm.control}
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

                      {user.role === "driver" && (
                        <>
                          <FormField
                            control={profileForm.control}
                            name="model"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Model</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={profileForm.control}
                            name="licensePlate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>License Plate</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

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
                          disabled={
                            isUpdating ||
                            isUploading ||
                            (user.role === "driver" && isVehicleLoading)
                          }
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
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-foreground font-medium">{user.email}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-foreground font-medium">
                  {user.profile?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Address</span>
              </div>
              <p className="text-foreground font-medium">
                {user.profile?.address || "Not provided"}
              </p>
            </div>

            {user.role === "driver" && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span className="text-sm font-medium">Vehicle Model</span>
                  </div>
                  <p className="text-foreground font-medium">
                    {vehicle?.model || "Not provided"}
                    {console.log(vehicle?.model)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span className="text-sm font-medium">License Plate</span>
                  </div>
                  <p className="text-foreground font-medium">
                    {vehicle?.licensePlate || "Not provided"}
                  </p>
                </div>
              </div>
            )}

            {/* keep your stats section unchanged */}

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
