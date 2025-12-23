export const mainNavItems = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Help", href: "/help" },
];

export const getUserNavItems = (userType: "user" | "tenant") => [
  {
    name: "Profile",
    href: userType === "tenant" ? "/tenant/dashboard" : "/profile",
  },
];

export const guestNavItems = [
  { name: "Login", href: "/auth/login" },
  { name: "Sign Up", href: "/auth/register", isPrimary: true },
];
