import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, MapPin, Users } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Build and maintain our React-based web applications with modern technologies.",
    },
    {
      title: "Mobile App Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Develop cross-platform mobile applications using React Native.",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "4-6 years",
      description:
        "Lead product strategy and roadmap for our ride-sharing platform.",
    },
    {
      title: "Customer Support Specialist",
      department: "Support",
      location: "Chittagong, Bangladesh",
      type: "Full-time",
      experience: "1-2 years",
      description: "Provide excellent customer service to riders and drivers.",
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health insurance coverage",
    "Flexible working hours",
    "Professional development budget",
    "Modern office environment",
    "Team building activities",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Help us revolutionize transportation in Bangladesh. Build the
              future of ride-sharing with us.
            </p>
            <Button size="lg" variant="outline" className="btn-outline-primary">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join a team that's passionate about making transportation
              accessible, safe, and reliable for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Great Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Work with talented individuals who are passionate about
                  technology and innovation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advance your career with learning opportunities and leadership
                  roles in a growing company.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Work-Life Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Enjoy flexible working hours and a supportive environment that
                  values your well-being.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-muted/30">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
            <p className="text-muted-foreground">
              Find your next opportunity with us
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{job.department}</Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.experience}</Badge>
                      </div>
                    </div>

                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-muted-foreground">
              We take care of our team members
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Don't see a position that fits? Send us your resume anyway. We're
            always looking for talented people.
          </p>
          <Button size="lg" variant="secondary" className="text-primary">
            Send Your Resume
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
