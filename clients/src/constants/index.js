import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';

export const darkBtn = [
  {
    id: 'light',
    icon: 'sunny',
    text: 'light',
  },
  {
    id: 'dark',
    icon: 'moon',
    text: 'dark',
  },
  {
    id: 'system',
    icon: 'desktop-outline',
    text: 'system',
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        id: 1,
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        id: 2,
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        id: 3,
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        id: 4,
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        id: 5,
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        id: 1,
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        id: 1,
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        id: 1,
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        id: 1,
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        id: 1,
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        id: 1,
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        id: 1,
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    Icon: FacebookIcon,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-2",
    Icon: TwitterIcon,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-3",
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/",
  },
];

export const shareSocialButtons = [
  { Component: FacebookShareButton, key: 'facebook', logoColor: 'text-sky-600' },
  { Component: TwitterShareButton, key: 'twitter', logoColor: 'text-sky-500' },
  { Component: WhatsappShareButton, key: 'whatsapp', logoColor: 'text-green-500' },
  { Component: LinkedinShareButton, key: 'linkedin', logoColor: 'text-sky-800' },
];

export const platformFeatures = [
  {
    iconName: 'book-outline',
    title: "Quality Content",
    description: "Our platform focuses on delivering well-researched, engaging content across various topics."
  },
  {
    iconName: 'people-outline',
    title: "Community Driven",
    description: "Built by and for passionate writers and readers who value knowledge sharing."
  },
  {
    iconName: 'lock-closed-outline',
    title: "Privacy Focused",
    description: "We prioritize your data privacy and give you control over your information."
  },
  {
    iconName: 'sparkles-outline',
    title: "Constant Improvement",
    description: "Regular updates and new features based on user feedback."
  }
];

export const teamMembers = [
  {
    name: "Abhinav Kumar",
    role: "Founder & CEO",
    bio: "Passionate about creating platforms that empower writers."
  },
  {
    name: "Aakash Kumar",
    role: "Lead Developer",
    bio: "Builds the technical foundation with user experience in mind."
  },
  {
    name: "Abhishek Singh",
    role: "Head of Content",
    bio: "Editor with experience in digital publishing."
  }
];

export const statistics = [
  { value: '100K+', description: 'Monthly Readers' },
  { value: '500+', description: 'Active Writers' },
  { value: '10K+', description: 'Published Articles' },
  { value: '5+', description: 'Years Operating' }
];

export const resourceSections = [
  {
    title: 'Documentation',
    icon: 'book-outline',
    links: [
      { href: '#', icon: 'document-text-outline', label: 'Getting Started Guide' },
      { href: '#', icon: 'code-slash-outline', label: 'API Documentation' },
      { href: '#', icon: 'videocam-outline', label: 'Tutorial Videos' },
    ],
  },
  {
    title: 'Community Help',
    icon: 'people-outline',
    links: [
      { href: '#', icon: 'logo-discord', label: 'Join our Discord Community' },
      { href: '#', icon: 'logo-github', label: 'GitHub Discussions' },
      { href: '#', icon: 'logo-stackoverflow', label: 'Stack Overflow' },
    ],
  },
];