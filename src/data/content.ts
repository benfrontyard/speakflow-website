import type { MediaAssetSource } from '../components/MediaAsset'

export const media = {
  runOnOneScreen: {
    type: 'lottie',
    src: '/media/Run-on-one-screen-control-from-another.json',
  },
  manageWorkflow: {
    type: 'lottie',
    src: '/media/Manage-your-workflow.json',
  },
} satisfies Record<string, MediaAssetSource>

export const content = {
  header: {
    resources: [
      { label: 'API', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Support', href: '#' },
    ],
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Blog', href: '#blog' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Download', href: '#download' },
    ],
    signIn: 'Sign In',
    signInHref: '#',
    cta: 'Create Account',
    ctaHref: '#',
  },
  hero: {
    headline: ['The teleprompter', 'that follows your voice'],
    subhead:
      'Reduce your production time, deliver better presentations, and record videos in your browser with Speakflow.',
    primaryCta: 'Sign Up',
  },
  scriptSection: {
    headline: ['Create your next video', 'without memorizing a word.'],
    description:
      "Write or paste your script, then use Speakflow's teleprompter directly in your browser.",
    cta: 'Try Speakflow',
    media: media.manageWorkflow,
  },
  usedBy: {
    title: 'Trusted By',
    logos: ['Logitech', 'ESPN', 'Facebook', 'Google', 'Mashable', 'LinkedIn', 'Marvel'],
  },
  creators: {
    title: ['Loved by creators who', 'want to sound natural'],
    items: [
      { name: 'Gabriel Pato', role: 'Youtuber · 700k+' },
      { name: 'Gabriel Pato', role: 'Youtuber · 700k+' },
    ],
  },
  nailIt: {
    title: 'Nail it. Every time.',
    description: 'Say goodbye to umms and ahhhs. Reduce your production time and costs.',
    cta: 'Try Speakflow Free',
  },
  workflow: {
    title: 'Your workflow. In Speakflow.',
    description: 'Write, revise and organize your scripts and recordings.',
    cta: 'Try Speakflow Free',
    features: [
      {
        label: 'All Devices',
        title: 'Works where you do',
        description:
          'Run Speakflow on laptop, tablet, or phone anywhere you need to record.',
      },
      {
        label: 'Dashboard',
        title: 'Organize and manage your scripts',
        description:
          'Keep scripts sorted, easy to find, and ready for your next recording session.',
      },
      {
        label: 'Team',
        title: 'Bring your crew',
        description:
          'Share scripts with teammates so everyone records from the same version.',
      },
    ],
  },
  testimonials: {
    title: ['Loved by creators who', 'want to sound natural'],
    items: [
      {
        quote:
          'I absolutely love Speakflow. Every time I use it I think I want to build an entire recording studio just so I can use it more. It honestly turned my 5-hour video sessions into 20 mins.',
        author: 'Gabriel Pato',
        role: 'Founder · Segmetrics',
      },
      {
        quote:
          "It is really great! I've been testing lots of teleprompter apps to find a solution that works well for me as a Youtube creator and so far Speakflow is the best.",
        author: 'Gabriel Pato',
        role: 'Youtuber · 700k+',
      },
      {
        quote:
          'I absolutely love Speakflow. Every time I use it I think I want to build an entire recording studio just so I can use it more. It honestly turned my 5-hour video sessions into 20 mins.',
        author: 'Gabriel Pato',
        role: 'Founder · Segmetrics',
      },
      {
        quote:
          "It is really great! I've been testing lots of teleprompter apps to find a solution that works well for me as a Youtube creator and so far Speakflow is the best.",
        author: 'Gabriel Pato',
        role: 'Youtuber · 700k+',
      },
    ],
  },
  blogPreview: {
    title: 'From the blog',
    subtitle: 'Product news, tips, & updates',
    viewAll: 'View All',
    posts: [
      {
        title: 'Speakflow guide',
        excerpt: 'Run Speakflow on phone and tablet, synced and ready to record.',
        image: {
          type: 'image',
          src: '/images/blog/speakflow-guide.png',
          alt: 'Speakflow guide showing synced phone and tablet teleprompters',
        },
      },
      {
        title: 'Follow your voice',
        excerpt: 'Voice-controlled scrolling that keeps up with your pacing.',
        image: {
          type: 'image',
          src: '/images/blog/follow-your-voice.png',
          alt: 'Creator using Speakflow voice-controlled teleprompter',
        },
      },
      {
        title: 'Customize your teleprompter',
        excerpt: 'Tune scrolling, typography, and layout to match how you deliver.',
        image: {
          type: 'image',
          src: '/images/blog/customize-your-teleprompter.png',
          alt: 'Speakflow teleprompter customization settings',
        },
      },
    ],
  },
  cta: {
    headline: 'Speak clearly. Finish strong.',
    body: "From first draft to final take, everything stays in sync so you can focus on what you're saying.",
    ctaLabel: 'Try Speakflow Free',
  },
  footer: {
    columns: [
      {
        title: 'Speakflow',
        links: [
          { label: 'Features', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Blog', href: '#' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Help Center', href: '#' },
          { label: 'Documentation', href: '#' },
          { label: 'Community', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
    copyright: '© 2026 Speakflow. All rights reserved.',
  },
} as const
