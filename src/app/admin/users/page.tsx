"use client";

/**
 * =====================================================================
 * Admin Users & Authors Management Page (/admin/users)
 * ---------------------------------------------------------------------
 * PURPOSE:
 * Manage platform authors, editors, and dashboard administrators.
 * Features:
 * - List all registered authors with active status and article counts
 * - Create new team members / guest authors
 * - Assign Roles: Admin, Editor, Author
 * - Delete or edit user profile
 * =====================================================================
 */

import React, { useState, useEffect } from "react";
import { Users, UserPlus, Trash2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import { DashboardUser } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor" | "author">("author");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  );

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and Email are required.");
      return;
    }

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, bio, avatar }),
      });

      if (!res.ok) throw new Error("Failed to add user.");

      const newUser = await res.json();
      setUsers([...users, newUser]);
      setName("");
      setEmail("");
      setBio("");
      setMessage("User created successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Users & Editorial Team
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage authors, technical reviewers, and dashboard administrators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Add User Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
            <UserPlus className="w-4 h-4 text-brand-primary" />
            <span>Add New Author / User</span>
          </h2>

          {message && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Siddharth Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="author@devlearn.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Dashboard Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-primary"
              >
                <option value="author">Author (Writes & Edits articles)</option>
                <option value="editor">Editor (Reviews & Publishes)</option>
                <option value="admin">Administrator (Full Access)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Short Bio
              </label>
              <textarea
                rows={2}
                placeholder="Experience, focus areas (e.g. Cypress, React)..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Avatar Image URL
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-brand-primary hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              {submitting ? "Saving..." : "Add User"}
            </button>
          </form>
        </div>

        {/* RIGHT: Users List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Active Team Members ({users.length})
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {u.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{u.email}</p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {u.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {u.status}
                  </span>

                  {users.length > 1 && (
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
