import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ClipboardList, Users, Shield, Clock, ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    
    <>
    <Header/>
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <ClipboardList className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Hostel Attendance
            <span className="block text-green-200">Management System</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-green-50 leading-relaxed">
            Streamline your hostel attendance tracking with our efficient digital solution. 
            Simple, reliable, and designed for educational institutions.
          </p>
          
          <Link href="/login">
            <Button 
              size="lg" 
              className="bg-white text-green-700 hover:bg-green-50 font-bold px-10 py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-2xl"
            >
              Access System
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "100%", label: "Digital Tracking", icon: ClipboardList },
              { number: "24/7", label: "System Access", icon: Clock },
              { number: "Secure", label: "Data Storage", icon: Shield },
              { number: "Easy", label: "User Interface", icon: Users }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for efficient hostel attendance management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Digital Attendance",
                description: "Mark and track attendance digitally with real-time updates and comprehensive reporting.",
                features: ["Real-time tracking", "Automated reports", "Easy marking"]
              },
              {
                icon: Users,
                title: "Student Management",
                description: "Maintain detailed student records and view attendance history with comprehensive profiles.",
                features: ["Student profiles", "Attendance history", "Quick search"]
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Ensure data security with reliable system performance and secure access controls.",
                features: ["Data security", "System reliability", "Access control"]
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border hover:border-green-200">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Access Section */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to manage attendance?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Access the Attendance Management System to start tracking and managing hostel attendance efficiently.
          </p>
          
          <Link href="/login">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all transform hover:scale-105"
            >
              Login to System
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About the System
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Efficient Attendance Tracking</h3>
              <p className="text-gray-600 mb-6">
                Our Attendance Management System provides a comprehensive solution for tracking 
                and managing hostel student attendance with ease and accuracy.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Simple and intuitive interface</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Real-time attendance tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Comprehensive reporting system</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-2xl">
              <div className="w-24 h-24 bg-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">For Hostel Management</h4>
              <p className="text-gray-600">
                Designed specifically for educational institutions to manage hostel attendance efficiently and effectively.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  )
}