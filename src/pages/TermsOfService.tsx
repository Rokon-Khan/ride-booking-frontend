import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Scale, 
  Shield, 
  Users, 
  Car, 
  CreditCard,
  AlertTriangle,
  Calendar,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "January 15, 2025";

  const keyTerms = [
    {
      icon: Users,
      title: "User Eligibility",
      description: "Must be 18+ years old with valid government ID and phone number",
    },
    {
      icon: Car,
      title: "Driver Requirements",
      description: "Valid driving license, vehicle registration, and insurance coverage",
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      description: "Secure payment processing with multiple payment options",
    },
    {
      icon: Shield,
      title: "Safety Standards",
      description: "Compliance with safety guidelines and community standards",
    },
  ];

  const prohibitedActivities = [
    "Using the service for illegal activities",
    "Harassment, discrimination, or inappropriate behavior",
    "Providing false information or impersonating others",
    "Attempting to circumvent safety features",
    "Using the platform for commercial purposes without authorization",
    "Interfering with the operation of the service",
  ];

  const liabilityLimitations = [
    {
      title: "Service Availability",
      description: "We don't guarantee uninterrupted service availability",
    },
    {
      title: "Third-Party Actions",
      description: "We're not liable for actions of drivers, riders, or third parties",
    },
    {
      title: "Indirect Damages",
      description: "We're not liable for indirect, incidental, or consequential damages",
    },
    {
      title: "Maximum Liability",
      description: "Our liability is limited to the amount paid for the specific service",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <Scale className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 mb-8">
              These terms govern your use of RideShare Pro services. Please read them carefully before using our platform.
            </p>
            <Badge variant="secondary" className="text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Last Updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </section>

      {/* Agreement Overview */}
      <section className="py-16">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Agreement Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you and RideShare Pro ("Company," "we," "our," or "us") regarding your use of our ride-sharing platform and services. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Key Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Key Terms & Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {keyTerms.map((term, index) => {
                    const Icon = term.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{term.title}</h3>
                          <p className="text-sm text-muted-foreground">{term.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Service Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Platform Services</h3>
                  <p className="text-sm text-muted-foreground">
                    RideShare Pro provides a technology platform that connects riders with independent drivers for transportation services. We do not provide transportation services directly but facilitate connections between users.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Roles</h3>
                  <p className="text-sm text-muted-foreground">
                    Users can register as riders (requesting transportation) or drivers (providing transportation). Some users may have both roles with separate registrations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Service Areas</h3>
                  <p className="text-sm text-muted-foreground">
                    Our services are currently available in major cities across Bangladesh. Service availability may vary by location and time.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Security</h3>
                  <p className="text-sm text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Accurate Information</h3>
                  <p className="text-sm text-muted-foreground">
                    You must provide accurate, current, and complete information during registration and keep your account information updated.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compliance</h3>
                  <p className="text-sm text-muted-foreground">
                    You must comply with all applicable laws, regulations, and these Terms when using our services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Respectful Behavior</h3>
                  <p className="text-sm text-muted-foreground">
                    You must treat other users, customer support, and company representatives with respect and courtesy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Driver-Specific Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Driver-Specific Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Independent Contractor Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Drivers are independent contractors, not employees of RideShare Pro. You have the freedom to choose when, where, and how often to provide services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Vehicle Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Drivers must maintain vehicles that meet our safety and quality standards, including valid registration, insurance, and regular maintenance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Background Checks</h3>
                  <p className="text-sm text-muted-foreground">
                    Drivers must pass background checks and maintain a clean driving record. We reserve the right to conduct periodic re-checks.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Service Standards</h3>
                  <p className="text-sm text-muted-foreground">
                    Drivers must maintain high service standards, including punctuality, professionalism, and vehicle cleanliness.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fare Calculation</h3>
                  <p className="text-sm text-muted-foreground">
                    Fares are calculated based on time, distance, demand, and other factors. Dynamic pricing may apply during peak hours or high-demand periods.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    We facilitate payment processing between riders and drivers. Riders authorize us to charge their selected payment method for rides and applicable fees.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Service Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    We charge service fees to drivers for use of the platform. Fee structures are communicated separately and may change with notice.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Refunds & Disputes</h3>
                  <p className="text-sm text-muted-foreground">
                    Refund requests are handled on a case-by-case basis. We provide a dispute resolution process for payment-related issues.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Prohibited Activities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The following activities are strictly prohibited when using our services:
                </p>
                <div className="space-y-2">
                  {prohibitedActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Violation Consequences:</strong> Violations may result in account suspension, termination, or legal action.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Liability & Disclaimers */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Liability & Disclaimers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liabilityLimitations.map((limitation, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">{limitation.title}</h3>
                      <p className="text-sm text-muted-foreground">{limitation.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> RideShare Pro is a technology platform connecting users. We are not responsible for the actions, behavior, or services provided by drivers or riders.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Our Rights</h3>
                  <p className="text-sm text-muted-foreground">
                    All content, features, and functionality of our platform are owned by RideShare Pro and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User License</h3>
                  <p className="text-sm text-muted-foreground">
                    We grant you a limited, non-exclusive, non-transferable license to use our services for personal, non-commercial purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Content</h3>
                  <p className="text-sm text-muted-foreground">
                    You retain ownership of content you provide but grant us a license to use it for service provision and improvement.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Account Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Your Right to Terminate</h3>
                  <p className="text-sm text-muted-foreground">
                    You may terminate your account at any time by contacting customer support or using the account deletion feature in the app.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Right to Terminate</h3>
                  <p className="text-sm text-muted-foreground">
                    We may suspend or terminate your account for violations of these Terms, illegal activities, or other reasons at our discretion.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Effect of Termination</h3>
                  <p className="text-sm text-muted-foreground">
                    Upon termination, your right to use the services ceases immediately. Some provisions of these Terms survive termination.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Informal Resolution</h3>
                  <p className="text-sm text-muted-foreground">
                    We encourage users to contact our customer support team first to resolve any disputes informally.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Governing Law</h3>
                  <p className="text-sm text-muted-foreground">
                    These Terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts of Bangladesh.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Arbitration</h3>
                  <p className="text-sm text-muted-foreground">
                    For certain disputes, we may require binding arbitration as an alternative to court proceedings.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may modify these Terms from time to time. We will notify users of material changes through the app, email, or by posting updated Terms on our website.
                </p>
                <p className="text-sm text-muted-foreground">
                  Continued use of our services after changes become effective constitutes acceptance of the modified Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>legal@ridesharepro.com</span>
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

export default TermsOfService;