
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <Navbar />
      
      {/* Hero Section - Moved much higher */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-7xl mx-auto w-full mt-4">
        <div className={`lg:w-1/2 space-y-6 mb-8 lg:mb-0 transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 rounded-xl text-sm font-semibold">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            🚀 The Future of Team Collaboration
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Work Together,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Anywhere
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              CollabSync empowers distributed teams with real-time collaboration, intelligent workflows, and seamless communication.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              to="/register"
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/login"
              className="group px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Existing Account</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full border-2 border-white"
                  ></div>
                ))}
              </div>
              <span className="text-gray-600"><span className="font-semibold">10,000+</span> teams</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className={`lg:w-1/2 flex justify-center relative transition-all duration-700 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <div className="relative max-w-lg">
            <div className="relative z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-2xl blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                alt="CollabSync Dashboard"
                className="relative rounded-xl shadow-xl border border-white/20"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100 animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Real-time</div>
                  <div className="text-xs text-gray-500">Live updates</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-100 animate-float-delayed z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Team Chat</div>
                  <div className="text-xs text-gray-500">Always connected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Adjusted spacing */}
      <section className="py-12 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 border border-purple-200 text-purple-700 rounded-xl text-sm font-semibold mb-4">
              ✨ Why CollabSync?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Modern Teams</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything your team needs to collaborate effectively with intelligent features.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: "⚡",
                title: "Real-time Collaboration",
                description: "Work together simultaneously with live editing and seamless version control.",
                features: ["Live document editing", "Instant updates", "Team presence", "Version history"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🔒",
                title: "Enterprise Security",
                description: "Military-grade security with advanced controls for sensitive data.",
                features: ["End-to-end encryption", "SOC 2 compliant", "Advanced permissions", "Audit logs"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🚀",
                title: "Smart Workflows",
                description: "Automate routine tasks and focus on what matters most.",
                features: ["Automated templates", "Smart suggestions", "Workflow automation", "Integration ready"],
                gradient: "from-green-500 to-blue-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-xl text-white shadow-md mb-4`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-slate-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "10K+", label: "Teams" },
              { number: "50+", label: "Countries" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-xl border border-purple-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Team?
            </h2>
            
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Join thousands of teams who have made collaboration effortless with CollabSync.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                to="/register"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span>Start Free Trial</span>
              </Link>
              
              <Link
                to="/demo"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 flex items-center gap-2"
              >
                <span>Watch Demo</span>
              </Link>
            </div>
            
            <p className="text-gray-500 mt-4 text-sm">
              No credit card required • Free 14-day trial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="text-xl font-bold text-white mb-3">CollabSync</div>
              <p className="text-gray-400 mb-4 text-sm max-w-md">
                The modern collaboration platform for distributed teams.
              </p>
            </div>
            
            {["Product", "Company"].map((section) => (
              <div key={section}>
                <div className="font-semibold text-white mb-3 text-sm">{section}</div>
                <div className="space-y-2 text-sm">
                  {["Features", "Pricing", "Examples"].map((item) => (
                    <a key={item} href="#" className="block hover:text-white transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
            &copy; 2025 CollabSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}