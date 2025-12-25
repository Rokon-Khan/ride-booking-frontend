import { Award, Eye, Target, Users } from "lucide-react";
// import Navigation from '@/components/Navigation';
// import Footer from '@/components/Footer';

const AboutUs = () => {
  const stats = [
    { number: "2018", label: "Founded" },
    { number: "50K+", label: "Happy Riders" },
    { number: "5K+", label: "Active Drivers" },
    { number: "100+", label: "Cities Served" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      bio: "Former transportation industry executive with 15+ years of experience in mobility solutions.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      position: "CTO",
      bio: "Tech visionary who previously built scalable platforms at leading ride-sharing companies.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Emily Rodriguez",
      position: "Head of Safety",
      bio: "Safety expert with background in urban planning and transportation safety regulations.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Safety First",
      description:
        "Every ride prioritizes passenger and driver safety through advanced technology and rigorous verification processes.",
    },
    {
      icon: Eye,
      title: "Transparency",
      description:
        "Clear pricing, honest communication, and open policies that build trust with our community.",
    },
    {
      icon: Award,
      title: "Quality Service",
      description:
        "Committed to providing exceptional experiences that exceed expectations every time.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Building strong relationships with riders, drivers, and local communities we serve.",
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white section-padding">
          <div className="container-width text-center">
            <h1 className="text-hero text-white mb-6">
              Revolutionizing
              <br />
              <span className="text-secondary">Transportation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're on a mission to make transportation accessible, safe, and
              sustainable for everyone, everywhere.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="animate-fade-in-up">
                <h2 className="text-section-title mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2018, RideShare Pro began with a simple vision:
                    to create a transportation platform that truly serves its
                    community. We saw the challenges people faced with
                    unreliable transportation options and decided to build
                    something better.
                  </p>
                  <p>
                    Starting in just one city, we focused on creating meaningful
                    relationships with both riders and drivers. Our commitment
                    to safety, transparency, and quality service helped us grow
                    organically through word-of-mouth recommendations.
                  </p>
                  <p>
                    Today, we're proud to serve over 100 cities worldwide,
                    connecting millions of people with safe, reliable
                    transportation options while providing flexible earning
                    opportunities for thousands of drivers.
                  </p>
                </div>
              </div>

              <div className="animate-slide-in-right">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="card-feature text-center"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="card-elevated p-8 animate-fade-in-up">
                <div className="p-3 bg-gradient-primary rounded-lg inline-flex mb-6">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-card-title text-2xl mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide safe, reliable, and affordable transportation
                  solutions that connect communities and empower people to move
                  freely and confidently. We're committed to creating value for
                  riders, drivers, and the cities we serve.
                </p>
              </div>

              <div className="card-elevated p-8 animate-fade-in-up animation-delay-200">
                <div className="p-3 bg-gradient-secondary rounded-lg inline-flex mb-6">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-card-title text-2xl mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted transportation platform, where
                  safety, sustainability, and service excellence drive
                  everything we do. We envision a future where transportation is
                  seamless, accessible, and environmentally responsible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide our decisions and shape the way we
                serve our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 bg-gradient-primary rounded-lg inline-flex mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-card-title mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="section-padding bg-muted">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-section-title">Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced leaders driving our mission forward.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="card-feature text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-medium"
                    />
                  </div>
                  <h3 className="text-card-title">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
