"use client";

import React, { useState } from "react";
import { GeneratedPostItem, ContentStatusType } from "@/lib/types";
import {
  X,
  Copy,
  CheckCircle2,
  Video,
  Sparkles,
  Calendar,
  Share2,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  Camera,
  Layers,
} from "lucide-react";
import { useToast } from "../ui/Toast";

interface PostDetailModalProps {
  post: GeneratedPostItem;
  onClose: () => void;
  onStatusChange: (status: ContentStatusType) => void;
}

export function PostDetailModal({ post, onClose, onStatusChange }: PostDetailModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"body" | "video" | "visual">("body");

  const handleCopyBody = () => {
    navigator.clipboard.writeText(post.bodyContent);
    setCopied(true);
    toast("Post content copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyVisualPrompt = () => {
    if (post.visualPrompt) {
      navigator.clipboard.writeText(post.visualPrompt);
      toast("AI Visual prompt copied!", "success");
    }
  };

  const getChannelIcon = () => {
    switch (post.channel) {
      case "LINKEDIN":
        return <Linkedin className="w-5 h-5 text-[#0a66c2]" />;
      case "EMAIL":
        return <Mail className="w-5 h-5 text-emerald-500" />;
      case "INSTAGRAM":
        return <Instagram className="w-5 h-5 text-rose-500" />;
      case "TIKTOK":
        return <Video className="w-5 h-5 text-cyan-400" />;
      case "FACEBOOK":
        return <Facebook className="w-5 h-5 text-[#1877f2]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
              {getChannelIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Day {post.dayNumber} • {post.channel}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {post.contentType}
                </span>
              </div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-md mt-0.5">
                {post.pillar}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Switcher & Tabs */}
        <div className="px-6 py-3 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("body")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "body"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
              }`}
            >
              Post Copy
            </button>
            {post.videoScript && (
              <button
                onClick={() => setActiveTab("video")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  activeTab === "video"
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Video Script
              </button>
            )}
            {post.visualPrompt && (
              <button
                onClick={() => setActiveTab("visual")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  activeTab === "visual"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                }`}
              >
                <Camera className="w-3.5 h-3.5" /> Visual Prompt
              </button>
            )}
          </div>

          {/* Status buttons */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Status:</span>
            {(["DRAFT", "SCHEDULED", "COPIED", "PUBLISHED"] as ContentStatusType[]).map((st) => (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold transition-all ${
                  post.status === st
                    ? st === "PUBLISHED"
                      ? "bg-emerald-600 text-white"
                      : st === "COPIED"
                      ? "bg-sky-600 text-white"
                      : st === "SCHEDULED"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-700 text-white"
                    : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === "body" && (
            <div className="space-y-4">
              {/* Hook Highlight */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                  Primary Hook (First 3 Seconds / First 2 Lines)
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  &ldquo;{post.hook}&rdquo;
                </div>
              </div>

              {/* Body */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Complete Post Copy
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {post.bodyContent.length} characters • ~{Math.round(post.bodyContent.split(" ").length / 200)} min read
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {post.bodyContent}
                </div>
              </div>
            </div>
          )}

          {activeTab === "video" && post.videoScript && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900">
                <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider mb-1">
                  Visual Hook Directive (0-3s)
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {post.videoScript.hookVisual}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Scene-by-Scene Storyboard
                </div>
                {post.videoScript.sceneBreakdown.map((scene, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                  >
                    {scene}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Audio Cue</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium">
                    {post.videoScript.audioCues}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Call to Action</div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium">
                    {post.videoScript.cta}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "visual" && post.visualPrompt && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Midjourney / DALL-E 3 Image Prompt
                  </span>
                  <button
                    onClick={handleCopyVisualPrompt}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy Prompt
                  </button>
                </div>
                <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-purple-200 dark:border-purple-800/80 text-purple-900 dark:text-purple-200">
                  /imagine prompt: {post.visualPrompt} --ar 16:9 --v 6.0 --style raw
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Click copy to grab formatted text for {post.channel}.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopyBody}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white gradient-brand shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Post Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
