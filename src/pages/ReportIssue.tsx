import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Phone,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: "",
    priority: "",
    rideId: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });

  const issueTypes = [
    {
      value: "safety",
      label: "Safety Concern",
      icon: Shield,
      color: "bg-red-100 text-red-800",
    },
    {
      value: "driver",
      label: "Driver Behavior",
      icon: AlertTriangle,
      color: "bg-orange-100 text-orange-800",
    },
    {
      value: "payment",
      label: "Payment Issue",
      icon: FileText,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "vehicle",
      label: "Vehicle Condition",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "app",
      label: "App Technical Issue",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "other",
      label: "Other",
      icon: FileText,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  const emergencyContacts = [
    {
      title: "Emergency Hotline",
      number: "+88 09611-677788",
      description: "For immediate safety concerns during a ride",
      available: "24/7",
    },
    {
      title: "Police Emergency",
      number: "999",
      description: "For serious criminal activities or immediate danger",
      available: "24/7",
    },
    {
      title: "Safety Support",
      number: "+88 01955-767196",
      description: "For safety-related questions and support",
      available: "24/7",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.issueType || !formData.description || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    toast.success(
      "Report submitted successfully. We'll contact you within 24 hours."
    );

    // Reset form
    setFormData({
      issueType: "",
      priority: "",
      rideId: "",
      description: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Report an Issue
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your safety and satisfaction are our top priorities. Report any
              concerns and we'll address them immediately.
            </p>
            <div className="bg-red-800/50 rounded-lg p-4 inline-block">
              <p className="text-sm">
                <strong>Emergency?</strong> Call{" "}
                <strong>+88 09611-677788</strong> immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-red-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-800">
              Emergency Contacts
            </h2>
            <p className="text-red-700">
              For immediate assistance, use these emergency contacts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card
                key={index}
                className="border-red-200 hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-lg text-red-800">
                      {contact.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {contact.number}
                  </div>
                  <p className="text-sm text-red-700 mb-2">
                    {contact.description}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-red-300 text-red-700"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {contact.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Report Form */}
      <section className="py-16">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Submit a Report</h2>
              <p className="text-muted-foreground">
                Provide detailed information about your concern so we can help
                you effectively
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Issue Types */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Issue Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {issueTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <div
                            key={type.value}
                            className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <Badge className={type.color} variant="secondary">
                                {type.value === "safety"
                                  ? "High Priority"
                                  : "Standard"}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Report Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="issueType">Issue Type *</Label>
                          <Select
                            value={formData.issueType}
                            onValueChange={(value) =>
                              handleInputChange("issueType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              {issueTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="priority">Priority Level</Label>
                          <Select
                            value={formData.priority}
                            onValueChange={(value) =>
                              handleInputChange("priority", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="rideId">Ride ID (if applicable)</Label>
                        <Input
                          id="rideId"
                          value={formData.rideId}
                          onChange={(e) =>
                            handleInputChange("rideId", e.target.value)
                          }
                          placeholder="Enter ride ID if this relates to a specific ride"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Please provide detailed information about the issue..."
                          rows={5}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                        <Camera className="h-5 w-5 text-blue-600" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800">
                            Attach Evidence (Optional)
                          </p>
                          <p className="text-blue-700">
                            You can attach photos or documents to support your
                            report
                          </p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <FileText className="h-5 w-5 mr-2" />
                        Submit Report
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Happens Next?</h2>
            <p className="text-muted-foreground">
              Here's how we handle your report
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Report Received</h3>
              <p className="text-sm text-muted-foreground">
                We receive and acknowledge your report immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Investigation</h3>
              <p className="text-sm text-muted-foreground">
                Our safety team investigates the issue thoroughly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Action Taken</h3>
              <p className="text-sm text-muted-foreground">
                We take appropriate action based on our findings.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Follow-up</h3>
              <p className="text-sm text-muted-foreground">
                We follow up with you about the resolution.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Response Time
              </h3>
              <p className="text-green-700">
                We aim to respond to all reports within{" "}
                <strong>24 hours</strong>. Safety-related issues are prioritized
                and handled immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportIssue;
