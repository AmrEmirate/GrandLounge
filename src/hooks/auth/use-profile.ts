"use client";

import type React from "react";

import { useState } from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
  profilePicture?: string;
  verified: boolean;
  createdAt: Date;
}

import api from "@/lib/api";

interface ProfileData {
  fullName: string;
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface Notifications {
  emailUpdates: boolean;
  emailPromotions: boolean;
  pushNotifications: boolean;
}

export function useProfile(user: User) {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user.fullName,
    email: user.email,
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  });

  const [notifications, setNotifications] = useState<Notifications>({
    emailUpdates: true,
    emailPromotions: false,
    pushNotifications: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", profileData.fullName);
      // Email usually not updated here if there is a specific request-email-change flow, but sending it just in case if BE allows

      await api.patch("/user/profile", formData);
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      const msg = error.response?.data?.message || "Failed to update profile";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    setIsLoading(true);
    try {
      await api.patch("/user/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      alert("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Password change error:", error);
      const msg = error.response?.data?.message || "Failed to change password";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
    ) {
      alert("Please upload a JPG, PNG, or GIF image.");
      return;
    }
    if (file.size > 1024 * 1024) {
      alert("Please upload an image smaller than 1MB.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      await api.patch("/user/profile", formData);
      alert("Profile picture updated!");
      // Optionally reload or update state
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      const msg = error.response?.data?.message || "Failed to upload avatar";
      alert(msg);
    }
  };

  const handleEmailVerification = async () => {
    setIsLoading(true);
    try {
      console.log("Sending email verification");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Verification email sent!");
    } catch (error) {
      console.error("Email verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSave = async () => {
    try {
      console.log("Saving notification preferences:", notifications);
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert("Notification preferences saved!");
    } catch (error) {
      console.error("Notification save error:", error);
    }
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return {
    profileData,
    passwordData,
    showPasswords,
    notifications,
    isLoading,
    setProfileData,
    setPasswordData,
    setNotifications,
    handleProfileUpdate,
    handlePasswordChange,
    handleAvatarUpload,
    handleEmailVerification,
    handleNotificationSave,
    togglePassword,
  };
}
