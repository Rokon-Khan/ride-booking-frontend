import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Code,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Heart,
  Users,
} from "lucide-react";

const License = () => {
  const lastUpdated = "January 15, 2025";

  const openSourceLibraries = [
    {
      name: "React",
      version: "^19.1.1",
      license: "MIT",
      description: "A JavaScript library for building user interfaces",
      url: "https://reactjs.org/",
    },
    {
      name: "TypeScript",
      version: "^5.0.0",
      license: "Apache-2.0",
      description: "TypeScript is a language for application-scale JavaScript",
      url: "https://www.typescriptlang.org/",
    },
    {
      name: "Tailwind CSS",
      version: "^4.1.12",
      license: "MIT",
      description: "A utility-first CSS framework for rapid UI development",
      url: "https://tailwindcss.com/",
    },
    {
      name: "React Router",
      version: "^7.8.1",
      license: "MIT",
      description: "Declarative routing for React applications",
      url: "https://reactrouter.com/",
    },
    {
      name: "Redux Toolkit",
      version: "^2.8.2",
      license: "MIT",
      description:
        "The official, opinionated, batteries-included toolset for efficient Redux development",
      url: "https://redux-toolkit.js.org/",
    },
    {
      name: "Lucide React",
      version: "^0.263.0",
      license: "ISC",
      description: "Beautiful & consistent icon toolkit made by the community",
      url: "https://lucide.dev/",
    },
    {
      name: "React Hook Form",
      version: "^7.62.0",
      license: "MIT",
      description:
        "Performant, flexible and extensible forms with easy validation",
      url: "https://react-hook-form.com/",
    },
    {
      name: "Recharts",
      version: "^2.5.0",
      license: "MIT",
      description: "A composable charting library built on React components",
      url: "https://recharts.org/",
    },
    {
      name: "React Hot Toast",
      version: "^2.4.0",
      license: "MIT",
      description: "Smoking hot React notifications",
      url: "https://react-hot-toast.com/",
    },
    {
      name: "Vite",
      version: "^7.1.2",
      license: "MIT",
      description: "Next generation frontend tooling",
      url: "https://vitejs.dev/",
    },
  ];

  const licenseTypes = [
    {
      name: "MIT License",
      count: 7,
      description:
        "A permissive license that allows commercial use, modification, and distribution",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Apache-2.0",
      count: 1,
      description: "A permissive license that provides patent protection",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "ISC License",
      count: 1,
      description:
        "A permissive license similar to MIT but with simpler language",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const attributions = [
    {
      category: "Images & Icons",
      items: [
        "Unsplash - High-quality stock photos (https://unsplash.com/)",
        "Lucide Icons - Beautiful icon set (https://lucide.dev/)",
        "Hero Icons - SVG icons by the makers of Tailwind CSS",
      ],
    },
    {
      category: "Fonts",
      items: [
        "Inter - Font family by Rasmus Andersson",
        "Google Fonts - Web font service by Google",
      ],
    },
    {
      category: "Services",
      items: [
        "Google Maps API - Mapping and location services",
        "Netlify - Web hosting and deployment platform",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto">
            <Code className="h-16 w-16 mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Open Source Licenses
            </h1>
            <p className="text-xl text-white/90 mb-8">
              RideShare Pro is built with amazing open source technologies.
              We're grateful to the developers and communities who make these
              tools available.
            </p>
            <Badge variant="secondary" className="text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              Last Updated: {lastUpdated}
            </Badge>
          </div>
        </div>
      </section>

      {/* Project License */}
      <section className="py-16">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  RideShare Pro License
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">MIT License</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Copyright (c) 2025 RideShare Pro
                  </p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      Permission is hereby granted, free of charge, to any
                      person obtaining a copy of this software and associated
                      documentation files (the "Software"), to deal in the
                      Software without restriction, including without limitation
                      the rights to use, copy, modify, merge, publish,
                      distribute, sublicense, and/or sell copies of the
                      Software, and to permit persons to whom the Software is
                      furnished to do so, subject to the following conditions:
                    </p>
                    <p>
                      The above copyright notice and this permission notice
                      shall be included in all copies or substantial portions of
                      the Software.
                    </p>
                    <p>
                      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                      KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                      WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                      PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
                      OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                      OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                      SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <span>Source code available at: </span>
                  <a
                    href="https://github.com/Rokon-Khan/ride-booking-frontend"
                    className="text-primary hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repository
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* License Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">License Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {licenseTypes.map((license, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">{license.name}</h3>
                        <div className="text-3xl font-bold text-primary mb-2">
                          {license.count}
                        </div>
                        <Badge className={license.color} variant="secondary">
                          Libraries
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {license.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Open Source Dependencies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Open Source Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  We use the following open source libraries and frameworks.
                  We're grateful to their maintainers and contributors.
                </p>
                <div className="space-y-4">
                  {openSourceLibraries.map((library, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{library.name}</h3>
                            <Badge variant="outline">{library.version}</Badge>
                            <Badge variant="secondary">{library.license}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {library.description}
                          </p>
                        </div>
                        <a
                          href={library.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Website
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Attributions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  Attributions & Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  We also want to acknowledge the following resources and
                  services that help make RideShare Pro possible.
                </p>
                <div className="space-y-6">
                  {attributions.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        {category.category}
                      </h3>
                      <div className="space-y-2 ml-7">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  Contributing to Open Source
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We believe in giving back to the open source community that
                  has made our project possible. Here's how we contribute:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Bug Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      We report bugs and issues we encounter in the libraries we
                      use.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      We contribute to documentation and help improve developer
                      experience.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Code Contributions</h3>
                    <p className="text-sm text-muted-foreground">
                      We submit pull requests and patches to improve open source
                      projects.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Financial Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We sponsor maintainers and projects that are critical to
                      our success.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">License Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our licensing, open source usage,
                  or want to report a licensing issue, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>legal@ridesharepro.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <a
                      href="https://github.com/Rokon-Khan/ride-booking-frontend/issues"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Issues
                    </a>
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

export default License;
