"use client"

import { useState, useEffect } from "react"
import { Heart, Github, Linkedin, Mail, MapPin, GraduationCap, Users, Waves, Fish, Anchor } from "lucide-react"

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-cyan-950 border-t border-cyan-400/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Floating sea creatures */}
        <Fish
          className="absolute top-8 left-10 w-8 h-8 text-cyan-400 animate-bounce"
          style={{ animationDuration: "6s" }}
        />
        <Fish
          className="absolute top-16 right-20 w-6 h-6 text-blue-400 animate-bounce"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        />
        <Anchor
          className="absolute bottom-20 left-1/4 w-6 h-6 text-slate-400 animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <Waves
          className="absolute bottom-8 right-1/3 w-8 h-8 text-cyan-300 animate-pulse"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        />
      </div>

      {/* Underwater light rays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-cyan-400/30 to-transparent transform rotate-12 animate-pulse"></div>
        <div
          className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-blue-400/20 to-transparent transform -rotate-6 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Team Aquanautical Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
                  <Fish className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Team Aquanautical
                </h3>
              </div>
              <p className="text-cyan-100 text-lg max-w-md">
                Pioneering the future of marine conservation through AI-driven deep sea research and biodiversity analysis.
              </p>
            </div>

            {/* Contributors */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-cyan-400" />
                Contributors
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Srijit", "Yash", "Aditya"].map((name, index) => (
                  <div
                    key={name}
                    className="group backdrop-blur-md bg-cyan-900/20 p-4 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:bg-cyan-900/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-cyan-300 font-bold text-lg">
                          {name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {name}
                        </h5>
                        <p className="text-sm text-cyan-200">Developer</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Institution Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-cyan-400" />
                Institution
              </h4>
              <div className="backdrop-blur-md bg-blue-900/20 p-6 rounded-xl border border-blue-400/20">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-white mb-2">
                      Dayananda Sagar College of Engineering
                    </h5>
                    <p className="text-cyan-200 text-sm leading-relaxed">
                      Bangalore, Karnataka, India
                    </p>
                    <p className="text-cyan-300 text-sm mt-2">
                      Part of Team Aquanautical
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "Species Recognition", href: "/species-recognition" },
                  { name: "Water Quality", href: "/water-quality" },
                  { name: "Voice Agent", href: "/voice-agent" },
                  { name: "Dashboard", href: "/dashboard" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-cyan-200 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Connect With Us</h4>
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-emerald-900/20 p-4 rounded-xl border border-emerald-400/20">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-emerald-200 text-sm">Email</p>
                    <p className="text-white font-medium">team@aquanautical.com</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-cyan-400/30 hover:border-cyan-400/50 hover:scale-110 transition-all duration-300 group"
                >
                  <Github className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-blue-400/30 hover:border-blue-400/50 hover:scale-110 transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cyan-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-cyan-200">
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>Made with passion for marine conservation</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-cyan-200 text-sm">
                © {currentYear} Team Aquanautical. All rights reserved.
              </p>
              <p className="text-cyan-300 text-xs mt-1">
                Deep Sea Research Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
