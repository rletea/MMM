"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FullProfilePayload, GeneratedPostItem, ContentStatusType } from "@/lib/types";
import { KanbanBoard } from "@/components/studio/KanbanBoard";
import { CalendarView } from "@/components/studio/CalendarView";
import { ExportToolbar } from "@/components/studio/ExportToolbar";
import { PostDetailModal } from "@/components/studio/PostDetailModal";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import Link from "next/link";
import { NewUserOnboarding } from "@/components/dashboard/NewUserOnboarding";

export default function StudioPage() {
  const [profile, setProfile] = useState<FullProfilePayload | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"kanban" | "calendar">("kanban");
  const [selectedChannel, setSelectedChannel] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalPost, setActiveModalPost] = useState<GeneratedPostItem | null>(null);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/profile?lang=${language}`);
      const data = await res.json();
      if (data.data) {
        setProfile(data.data);
      } else {
        setProfile(null);
      }
      if (data.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error("Studio profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateStatus = async (id: string, newStatus: ContentStatusType) => {
    if (!profile) return;

    // Optimistic UI update
    setProfile({
      ...profile,
      contents: profile.contents.map((p) =>
        p.id === id ? { ...p, status: newStatus } : p
      ),
    });

    if (activeModalPost && activeModalPost.id === id) {
      setActiveModalPost({ ...activeModalPost, status: newStatus });
    }

    try {
      await fetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast(`Post updated to ${newStatus}`, "success");
    } catch {
      toast("Failed to update status remotely.", "error");
    }
  };

  const handleBatchPublish = async () => {
    if (!profile) return;
    const postIds = filteredPosts.map((p) => p.id);
    if (postIds.length === 0) return;

    setProfile({
      ...profile,
      contents: profile.contents.map((p) =>
        postIds.includes(p.id) ? { ...p, status: "PUBLISHED" } : p
      ),
    });

    try {
      await fetch("/api/content/batch-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postIds, status: "PUBLISHED" }),
      });
      toast(`Marked ${postIds.length} posts as Published!`, "success");
    } catch {
      toast("Batch update failed.", "error");
    }
  };

  const handleQuickCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast(t("studio.copied_toast"), "success");
  };

  // Filtered post list
  const filteredPosts = useMemo(() => {
    if (!profile || !profile.contents) return [];
    return profile.contents.filter((post) => {
      const matchChannel =
        selectedChannel === "ALL" || post.channel === selectedChannel;
      const body = post.body || (post as any).bodyContent || "";
      const topic = post.topic || (post as any).pillar || "";
      const matchSearch =
        searchQuery.trim() === "" ||
        post.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
        body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchChannel && matchSearch;
    });
  }, [profile, selectedChannel, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-sm font-semibold text-slate-500">
          {t("studio.loading")}
        </span>
      </div>
    );
  }

  if (!profile) {
    return <NewUserOnboarding userName={currentUser?.name} />;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Studio Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> {t("nav.studio")}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {profile.businessProfile?.businessName} • {t("studio.title")}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t("studio.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wizard"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t("studio.regenerate")}
          </Link>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <ExportToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        posts={filteredPosts}
        profile={profile}
        onBatchPublish={handleBatchPublish}
      />

      {/* Main Studio View: Kanban or Calendar */}
      {viewMode === "kanban" ? (
        <KanbanBoard
          posts={filteredPosts}
          onSelectPost={(p) => setActiveModalPost(p)}
          onUpdateStatus={handleUpdateStatus}
          onQuickCopy={handleQuickCopy}
        />
      ) : (
        <CalendarView
          posts={filteredPosts}
          onSelectPost={(p) => setActiveModalPost(p)}
        />
      )}

      {/* Post Detail Inspector Modal */}
      {activeModalPost && (
        <PostDetailModal
          post={activeModalPost}
          onClose={() => setActiveModalPost(null)}
          onStatusChange={(newStatus) => handleUpdateStatus(activeModalPost.id, newStatus)}
        />
      )}
    </div>
  );
}
