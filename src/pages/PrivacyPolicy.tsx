import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2025";

  const dataTypes = [
    {
      icon: Users,
      title: "Personal Information",
      description: "Name, email, phone number, profile photo, and government ID for verification",
    },
    {
      icon: MapPin,
      title: "Location Data",
      description: "GPS coordinates, pickup and drop-off locations, and route information",
    },
    {
      icon: Phone,
      title: "Device Information",
      description: "Device type, operating system, app version, and unique device identifiers",
    },
    {
      icon: Database,
      title: "Usage Data",
      description: "App interactions, ride history, preferences, and performance analytics",
    },
  ];

  const dataUsage = [
    {
      title: "Service Provision",
      description: "To provide ride-sharing services, match riders with drivers, and process payments",
    },
    {
      title: "Safety & Security",
      description: "To verify user identity, ensure safety, and investigate incidents",
    },
    {
      title: "Communication",
      description: "To send ride updates, notifications, and customer support messages",
    },
    {
      title: "Improvement",
      description: "To analyze usage patterns and improve our services and user experience",
    },
  ];

  const userRights = [
    {
      icon: Eye,
      title: "Access Your Data",
      description: "Request a copy of all personal data we have about you",
    },
    {
      icon: Lock,
      title: "Data Portability",
      description: "Export your data in a machine-readable format",
    },
    {
      icon: Shield,
      title: "Correction Rights",
      description: "Update or correct inaccurate personal information",
    },
    {
      icon: Database,
      title: "Deletion Rights",
      description: "Request deletion of your personal data (subject to legal requirements)",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <Shield className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We're committed to protecting your privacy and being transparent about how we collect, use, and share your information.
            </p>
            <Badge variant="secondary" className="text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Last Updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Privacy Policy Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy explains how RideShare Pro ("we," "our," or "us") collects, uses, processes, and shares information about you when you use our ride-sharing platform and services. By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {dataTypes.map((type, index) => {
                    const Icon = type.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataUsage.map((usage, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-semibold mb-1">{usage.title}</h3>
                        <p className="text-sm text-muted-foreground">{usage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">With Other Users</h3>
                  <p className="text-sm text-muted-foreground">
                    We share limited information between riders and drivers to facilitate rides, including names, photos, vehicle information, and location data during active rides.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">With Service Providers</h3>
                  <p className="text-sm text-muted-foreground">
                    We work with third-party service providers for payment processing, mapping services, customer support, and analytics. These providers are bound by confidentiality agreements.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">For Legal Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    We may share information when required by law, to respond to legal requests, or to protect the rights, property, and safety of our users and the public.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Business Transfers</h3>
                  <p className="text-sm text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business transaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <Lock className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Encryption</h3>
                    <p className="text-sm text-muted-foreground">All data is encrypted in transit and at rest using industry-standard encryption.</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <Shield className="h-6 w-6 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Access Controls</h3>
                    <p className="text-sm text-muted-foreground">Strict access controls ensure only authorized personnel can access user data.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Your Privacy Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {userRights.map((right, index) => {
                    const Icon = right.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{right.title}</h3>
                          <p className="text-sm text-muted-foreground">{right.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>To exercise your rights:</strong> Contact us at privacy@ridesharepro.com or through the app settings. We'll respond to your request within 30 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">Account Information</span>
                    <Badge variant="outline">Until account deletion</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">Ride History</span>
                    <Badge variant="outline">7 years (for legal compliance)</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">Location Data</span>
                    <Badge variant="outline">1 year after ride completion</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium">Support Communications</span>
                    <Badge variant="outline">3 years</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Globe className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground mb-4">
                      Your information may be transferred to and processed in countries other than Bangladesh. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We use standard contractual clauses and other legal mechanisms to ensure your data receives adequate protection wherever it's processed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-sm text-muted-foreground">
                  We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>privacy@ridesharepro.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+88 01955-767196</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Railgate Street, Jashore, Khulna, Bangladesh</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;