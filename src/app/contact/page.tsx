"use client";

/**
 * =====================================================================
 * Contact Page (Screen 7)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Contact and inquiries page matching Screen 7.
 * Features:
 * 1. Contact Info cards on the left:
 *    - Email: hello@devlearn.in
 *    - Phone: +91 98765 43210
 *    - Location: India
 * 2. Interactive message form on the right:
 *    - Name, Email, Message
 *    - Real-time client-side validation
 *    - Direct submission to /api/contact with success confirmation
 * =====================================================================
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header (Screen 7) */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Have a question, suggestion or want to collaborate? Feel free to reach out.
          </p>
        </div>

        {/* 2-Column Content Grid: Contact Details + Form (Screen 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Contact Information Cards (Screen 7) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  hello@devlearn.in
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-brand-secondary flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Location
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  India
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Contact Form (Screen 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-xs">
            
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your message has been sent successfully. Our editorial team will review
                  it and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2.5 bg-brand-primary text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-slate-800 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-slate-800 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary text-slate-800 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-primary/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
