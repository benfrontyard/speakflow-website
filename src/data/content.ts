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
  createVideo: {
    type: 'video',
    src: '/media/purchaser_16x9.mp4',
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
    stats: [
      { label: 'Active Creators', value: '50K+' },
      { label: 'Videos Recorded', value: '1M+' },
      { label: 'Countries', value: '120' },
    ],
    learnMore: {
      label: 'Learn More',
      href: '#how-it-works',
    },
  },
  scriptSection: {
    pill: 'Write & Record',
    headline: ['Create your next video', 'without memorizing a word.'],
    description:
      'Write or paste your script, then use Speakflow\u2019s teleprompter directly in your browser.',
    cta: 'Try Speakflow',
    media: media.createVideo,
  },
  usedBy: {
    title: 'Used by nice folks at',
    logos: [
      { name: 'UCLA', src: '/images/logos/ucla.png' },
      { name: 'Logitech', src: '/images/logos/logitech.png' },
      { name: 'LinkedIn', src: '/images/logos/linkedin.png' },
      { name: 'Google', src: '/images/logos/google.png' },
      { name: 'Apple', src: '/images/logos/apple.png' },
      { name: 'Facebook', src: '/images/logos/facebook.png' },
      { name: 'Marvel', src: '/images/logos/marvel.png' },
      { name: 'ESPN', src: '/images/logos/espn.png' },
      { name: 'Shopify', src: '/images/logos/shopify.png' },
      { name: 'HubSpot', src: '/images/logos/hubspot.png' },
      { name: 'Stanford', src: '/images/logos/stanford.png' },
    ],
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Nail the take without memorizing every word',
    intro:
      'Speakflow helps you write, rehearse, collaborate, and record from the setup you already use.',
    steps: [
      {
        number: '01',
        pill: 'Flow',
        title: 'Read naturally with Flow',
        copy: 'Say goodbye to umms and ahhhs. Flow follows your voice as you speak, so you can stay present instead of chasing the script.',
        primaryCta: 'Try Flow free',
        primaryCtaHref: '#',
        secondaryCta: 'See how it works',
        secondaryCtaHref: '#',
        media: media.manageWorkflow,
      },
      {
        number: '02',
        pill: 'Teams',
        title: 'Collaborate on every script',
        copy: 'Invite your team to write, edit, organize, and keep track of scripts together before recording starts.',
        primaryCta: 'Create a workspace',
        primaryCtaHref: '#',
        secondaryCta: 'View team features',
        secondaryCtaHref: '#',
        media: media.manageWorkflow,
      },
      {
        number: '03',
        pill: 'Remote',
        title: 'Control your setup from anywhere',
        copy: 'Scroll your tablet from your phone, your phone from your computer, or run multiple screens with Remote.',
        primaryCta: 'Start recording',
        primaryCtaHref: '#',
        secondaryCta: 'Learn about Remote',
        secondaryCtaHref: '#',
        media: media.runOnOneScreen,
      },
    ],
  },
  workflow: {
    title: 'Your workflow, in Speakflow.',
    description: 'Write, revise and organize your scripts and recordings.',
    cta: 'Try Speakflow Free',
    features: [
      {
        label: 'All Devices',
        title: 'Works where you do',
        description:
          'Run Speakflow on laptop, tablet, or phone anywhere you need to record.',
        media: media.runOnOneScreen,
      },
      {
        label: 'Dashboard',
        title: 'Organize and manage your scripts',
        description:
          'Keep scripts sorted, easy to find, and ready for your next recording session.',
        media: media.manageWorkflow,
      },
      {
        label: 'Team',
        title: 'Bring your crew',
        description:
          'Share scripts with teammates so everyone records from the same version.',
        media: media.manageWorkflow,
      },
    ],
  },
  testimonials: {
    pill: 'Customer Stories',
    title: ['Built with the creators', 'leading what\u2019s next'],
    subtitle: 'Real videos. Real scale. Real outcomes.',
    viewAll: 'View Customer Stories',
    viewAllHref: '#',
    featured: [
      {
        name: 'Andrew Johnson',
        role: 'Founder, No Walls Studio',
        video: '/images/testimonials/andrew-johnson.mp4',
        logo: { src: '/images/testimonials/nws.svg', alt: 'No Walls Studio' },
        href: '#',
      },
      {
        name: 'Rasmus Kalms',
        role: 'CPO, Anthill',
        video: '/images/testimonials/rasmus-kalms.mp4',
        logo: { src: '/images/testimonials/anthill.svg', alt: 'Anthill' },
        href: '#',
      },
    ],
    quotes: [
      {
        quote:
          'Speakflow helped us deliver polished presentations without memorizing a single line.',
        company: 'Logitech',
        logo: { src: '/images/logos/logitech.png', alt: 'Logitech' },
      },
      {
        quote: 'Speakflow is a partner that accelerates our content production.',
        company: 'ESPN',
        logo: { src: '/images/logos/espn.png', alt: 'ESPN' },
      },
      {
        quote:
          'Speakflow\u2019s platform offers the flexibility, scalability, and ease we needed.',
        company: 'Google',
        logo: { src: '/images/logos/google.png', alt: 'Google' },
      },
      {
        quote: 'With Speakflow, we are able to reliably expand our video offerings.',
        company: 'LinkedIn',
        logo: { src: '/images/logos/linkedin.png', alt: 'LinkedIn' },
      },
    ],
  },
  blogPreview: {
    pill: 'From the blog',
    title: 'Guides for better recordings',
    subtitle: 'Tips, feature deep-dives, and setup guides from the Speakflow team.',
    viewAll: 'View all posts',
    viewAllHref: '#',
    posts: [
      {
        title: 'Run Speakflow on any screen',
        category: 'Product',
        date: '18 FEB 2026',
        excerpt:
          'Start on your phone, control from your tablet — synced and ready when you hit record.',
        href: '#',
        image: {
          type: 'image',
          src: '/images/blog/speakflow-guide.png',
          alt: 'Phone and tablet running Speakflow in sync',
        },
      },
      {
        title: 'Let the script follow you',
        category: 'Features',
        date: '17 FEB 2026',
        excerpt:
          'Flow tracks your voice as you speak, so you stay present instead of chasing the scroll.',
        href: '#',
        image: {
          type: 'image',
          src: '/images/blog/follow-your-voice.png',
          alt: 'Creator using Speakflow Flow voice-controlled teleprompter',
        },
      },
      {
        title: 'Make the teleprompter feel like yours',
        category: 'Tips',
        date: '16 FEB 2026',
        excerpt:
          'Adjust scroll speed, type size, and layout until delivering feels natural.',
        href: '#',
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
    body: 'From first draft to final take, everything stays in sync so you can focus on what you\u2019re saying.',
    ctaLabel: 'Try Speakflow Free',
    ctaHref: '#',
    illustrations: {
      prompter: {
        src: '/images/cta/prompter.png',
        alt: 'Illustration of a teleprompter on a tripod with a creator waving',
      },
      mic: {
        src: '/images/cta/mic.png',
        alt: 'Illustration of a creator sitting on a studio microphone',
      },
      laptop: {
        src: '/images/cta/laptop.png',
        alt: 'Illustration of a laptop running Speakflow with a creator holding a folder',
      },
    },
  },
  footer: {
    promo: {
      headline: 'Get started for free',
      links: [
        { label: 'Pricing', href: '#' },
        { label: 'Compare plans', href: '#' },
        { label: 'Watch demos', href: '#' },
      ],
      cta: { label: 'Try Speakflow Free', href: '#' },
    },
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Home', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Compare', href: '#' },
          { label: 'Affiliate Program', href: '#' },
          { label: 'Desktop App', href: '#' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'Teleprompter', href: '#' },
          { label: 'Webcam Recorder', href: '#' },
          { label: 'Script Checker', href: '#' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Customer Support', href: '#' },
          { label: 'Blog', href: '#' },
          { label: 'Getting Started', href: '#' },
          { label: 'Documentation', href: '#' },
          { label: 'API Docs', href: '#' },
        ],
      },
    ],
    social: [
      { label: 'Instagram', href: '#', icon: 'instagram' },
      { label: 'X', href: '#', icon: 'x' },
      { label: 'Facebook', href: '#', icon: 'facebook' },
      { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
    copyright: '© 2026 Speakflow. All rights reserved.',
  },
} as const
