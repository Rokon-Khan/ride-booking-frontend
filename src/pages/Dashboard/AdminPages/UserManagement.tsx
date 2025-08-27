import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ban, CheckCircle, Eye, Search } from "lucide-react";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  useBlockUserMutation,
  useListAllUsersQuery,
  useUnblockUserMutation,
} from "@/redux/features/admin/adminApi";
import { Link } from "react-router";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading } = useListAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const users = data?.data || [];

  const handleUserAction = async (
    userId: string,
    action: "block" | "unblock"
  ) => {
    try {
      if (action === "block") {
        await blockUser({ userId }).unwrap();
      } else {
        await unblockUser({ userId }).unwrap();
      }
    } catch (err) {
      console.error(`Failed to ${action} user`, err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (isLoading) {
    return (
      <div>
        <Card className="w-full max-w-md mx-auto mt-6">
          <CardContent>
            <Skeleton className="h-12 w-12 rounded-full mx-auto mb-4" />
            <Skeleton className="h-4 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage riders and drivers on your platform
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select onValueChange={setRoleFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="rider">Riders</SelectItem>
            <SelectItem value="driver">Drivers</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user._id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">
                      {user.profile?.name || "Unknown User"}
                    </h3>
                    <Badge
                      variant={
                        user.role === "driver"
                          ? "default"
                          : user.role === "admin"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>{user.email}</div>
                    <div>
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/dashboard/user-management/${user?._id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  {user.status === "active" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUserAction(user._id, "block")}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Block
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleUserAction(user._id, "unblock")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Unblock
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-muted-foreground text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
