import Link from "next/link";
import { ArrowRight, Code, Image, Lock } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "Ready-to-Use Components",
      description: "Copy-paste friendly code blocks with syntax highlighting",
    },
    {
      icon: Image,
      title: "Visual References",
      description: "Screenshots and examples to guide your implementation",
    },
    {
      icon: Lock,
      title: "Admin Controlled",
      description: "Secure admin panel for managing all components",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-transparent to-accent/30" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Build Faster with
              <span className="text-primary block mt-2">
                Mana UI Components
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              A curated collection of reusable UI components with step-by-step
              instructions and copyable code. Perfect for speeding up your
              development workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/components"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>Browse Components</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center px-6 py-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg border border-border shadow-soft"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Explore our collection of UI components and speed up your
              development workflow today.
            </p>
            <Link
              href="/components"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
