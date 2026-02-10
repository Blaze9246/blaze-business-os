"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { User, Mail, Camera, Loader2 } from "lucide-react";

export function UserProfileCard() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const [isUploading, setIsUploading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-elevated" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-surface-elevated rounded" />
            <div className="w-48 h-3 bg-surface-elevated rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await user.setProfileImage({ file });
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="relative group">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName || "User"}
              className="w-16 h-16 rounded-full bg-surface-elevated object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center">
              <span className="text-2xl font-medium text-primary-400">
                {user.firstName?.[0] || user.lastName?.[0] || "U"}
              </span>
            </div>
          )}
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-white" />
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-zinc-100">
            {user.fullName || "User"}
          </h3>
          <div className="flex items-center gap-2 text-zinc-400 mt-1">
            <Mail className="w-4 h-4" />
            <span className="text-sm truncate">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>
          {user.primaryPhoneNumber && (
            <div className="flex items-center gap-2 text-zinc-400 mt-1">
              <User className="w-4 h-4" />
              <span className="text-sm">{user.primaryPhoneNumber.phoneNumber}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => openUserProfile()}
          className="px-4 py-2 bg-surface-elevated hover:bg-surface-elevated/80 text-zinc-300 text-sm font-medium rounded-lg transition-colors border border-border"
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Role</p>
          <p className="text-sm font-medium text-zinc-300 mt-1">Administrator</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Member Since</p>
          <p className="text-sm font-medium text-zinc-300 mt-1">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
