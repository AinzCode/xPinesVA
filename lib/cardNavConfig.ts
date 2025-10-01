export const cardNavItems = [
  {
    label: "Our Services",
    bgColor: "#097969",
    textColor: "#ffffff",
    links: [
      { label: "General Virtual Assistant", href: "/expertise/gva", ariaLabel: "Learn about General Virtual Assistant services" },
      { label: "Executive Virtual Assistant", href: "/expertise/eva", ariaLabel: "Learn about Executive Virtual Assistant services" },
      { label: "Inside Sales Agent", href: "/expertise/isa", ariaLabel: "Learn about Inside Sales Agent services" },
      { label: "Virtual Medical Assistant", href: "/expertise/vma", ariaLabel: "Learn about Virtual Medical Assistant services" }
    ]
  },
  {
    label: "About Us",
    bgColor: "#c2b59b",
    textColor: "#27423b",
    links: [
      { label: "Our Story", href: "/our-story", ariaLabel: "Learn about our story and mission" },
      { label: "Why Choose Us", href: "/#why-choose-us", ariaLabel: "Discover why clients choose Pines VA" }
    ]
  },
  {
    label: "Connect",
    bgColor: "#27423b",
    textColor: "#ffffff",
    links: [
      { label: "Let's Connect", href: "/connect", ariaLabel: "Get in touch with us" },
      { label: "Social Spaces", href: "/#social-spaces", ariaLabel: "Find us on social media" }
    ]
  }
];

export const cardNavConfig = {
  logo: "/Asset 9.svg",
  logoAlt: "Pines VA Logo",
  items: cardNavItems,
  baseColor: "#ffffff",
  menuColor: "#27423b",
  buttonBgColor: "#097969",
  buttonTextColor: "#ffffff"
};