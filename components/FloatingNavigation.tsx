"use client";

import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { 
  Home, 
  Users, 
  Settings, 
  BookOpen, 
  Share2, 
  Mail,
  Briefcase,
  UserCheck,
  Phone,
  Stethoscope
} from "lucide-react";

export function FloatingNavigation() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Our Story",
      link: "/our-story",
      icon: <Users className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "/services", 
      icon: <Settings className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "GVA",
      link: "/expertise/gva",
      icon: <Briefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "EVA", 
      link: "/expertise/eva",
      icon: <UserCheck className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "ISA",
      link: "/expertise/isa", 
      icon: <Phone className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "MVA",
      link: "/expertise/mva",
      icon: <Stethoscope className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Guides",
      link: "/guides",
      icon: <BookOpen className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Social",
      link: "/social-spaces",
      icon: <Share2 className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Connect",
      link: "/connect",
      icon: <Mail className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}