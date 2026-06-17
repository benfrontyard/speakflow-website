import type { MediaAssetSource } from '../components/MediaAsset'
import { assetUrl } from '../lib/assetUrl'

export const media = {
  runOnOneScreen: {
    type: 'lottie',
    src: assetUrl('/media/Run-on-one-screen-control-from-another.json'),
  },
  manageWorkflow: {
    type: 'lottie',
    src: assetUrl('/media/Manage-your-workflow.json'),
  },
  worksWhereYouDo: {
    type: 'lottie',
    src: assetUrl('/media/Works-where-you-do.json'),
    inset: '-left-[12%] -right-[12%] -top-[40%] -bottom-[8%]',
  },
  bringYourCrew: {
    type: 'lottie',
    src: assetUrl('/media/Bring-your-crew-Elegant.json'),
  },
  createVideo: {
    type: 'video',
    src: assetUrl('/media/purchaser_16x9.mp4'),
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
    headline: {
      static: 'The teleprompter that',
      rotating: [
        'follows your voice',
        'keeps you on script',
        'scrolls as you speak',
        'helps you nail the take',
      ],
    },
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
    demoVideo: assetUrl('/images/testimonials/andrew-johnson.mp4'),
    demoScript: [
      'Hello everyone,',
      '',
      'Today I want to talk about something that a lot of people struggle with when they first start recording videos or presenting online. That is speaking with confidence.',
      '',
      'Most of the time the challenge is not that we do not know what we want to say. The real challenge is delivering the message clearly while staying relaxed and natural.',
      '',
      'When people feel nervous they tend to rush their words, lose their place, or overthink every sentence. That is completely normal. Confidence is not about being perfect. It is about staying focused on the message you want to share.',
      '',
      'One way to build confidence is to slow down and give yourself time to speak. A short pause between ideas can actually make you sound more thoughtful and clear.',
      '',
      'Another helpful approach is to keep your script simple. Write the way you speak. If something feels awkward when you read it out loud, adjust the wording until it sounds natural.',
      '',
      'It also helps to practice a few times before recording. You do not need to memorize every line. The goal is just to become comfortable with the flow of your message.',
      '',
      'When you feel prepared, your delivery becomes more relaxed. Your voice sounds steadier. Your ideas come across more clearly.',
      '',
      'Confidence grows with repetition. The more you practice speaking on camera, the more natural it begins to feel.',
      '',
      'So remember, focus on your message, speak at a steady pace, and give yourself the space to communicate clearly.',
      '',
      'Over time your confidence will follow.',
    ],
  },
  usedBy: {
    title: 'Used by nice folks at',
    logos: [
      { name: 'UCLA', src: assetUrl('/images/logos/ucla.png') },
      { name: 'Logitech', src: assetUrl('/images/logos/logitech.png') },
      { name: 'LinkedIn', src: assetUrl('/images/logos/linkedin.png') },
      { name: 'Google', src: assetUrl('/images/logos/google.png') },
      { name: 'Apple', src: assetUrl('/images/logos/apple.png') },
      { name: 'Facebook', src: assetUrl('/images/logos/facebook.png') },
      { name: 'Marvel', src: assetUrl('/images/logos/marvel.png') },
      { name: 'ESPN', src: assetUrl('/images/logos/espn.png') },
      { name: 'Shopify', src: assetUrl('/images/logos/shopify.png') },
      { name: 'HubSpot', src: assetUrl('/images/logos/hubspot.png') },
      { name: 'Stanford', src: assetUrl('/images/logos/stanford.png') },
    ],
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'Nail the take without memorizing every word',
    intro:
      'Speakflow helps you write, rehearse, collaborate, and record from the setup you already use.',
    flowScript: [
      'Hello everyone,',
      '',
      'Today I want to talk about something that a lot of people struggle with when they first start recording videos or presenting online. That is speaking with confidence.',
      '',
      'Most of the time the challenge is not that we do not know what we want to say. The real challenge is delivering the message clearly while staying relaxed and natural.',
      '',
      'When people feel nervous they tend to rush their words, lose their place, or forget what comes next.',
    ],
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
        demo: 'flow-teleprompter',
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
        demo: 'teams-collaborate',
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
        media: media.worksWhereYouDo,
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
        media: media.bringYourCrew,
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
        video: assetUrl('/images/testimonials/andrew-johnson.mp4'),
        logo: { src: assetUrl('/images/testimonials/nws.svg'), alt: 'No Walls Studio' },
        href: '#',
      },
      {
        name: 'Rasmus Kalms',
        role: 'CPO, Anthill',
        video: assetUrl('/images/testimonials/rasmus-kalms.mp4'),
        logo: { src: assetUrl('/images/testimonials/anthill.svg'), alt: 'Anthill' },
        href: '#',
      },
    ],
    quotes: [
      {
        quote:
          'Speakflow helped us deliver polished presentations without memorizing a single line.',
        company: 'Logitech',
        logo: { src: assetUrl('/images/logos/logitech.png'), alt: 'Logitech' },
      },
      {
        quote: 'Speakflow is a partner that accelerates our content production.',
        company: 'ESPN',
        logo: { src: assetUrl('/images/logos/espn.png'), alt: 'ESPN' },
      },
      {
        quote:
          'Speakflow\u2019s platform offers the flexibility, scalability, and ease we needed.',
        company: 'Google',
        logo: { src: assetUrl('/images/logos/google.png'), alt: 'Google' },
      },
      {
        quote: 'With Speakflow, we are able to reliably expand our video offerings.',
        company: 'LinkedIn',
        logo: { src: assetUrl('/images/logos/linkedin.png'), alt: 'LinkedIn' },
      },
    ],
  },
  faq: {
    pill: 'FAQ',
    title: 'Common questions',
    subtitle: 'Everything you need to know before your first recording.',
    items: [
      {
        question: 'Do I need to memorize my script?',
        answer:
          'No. Speakflow is built so you can read naturally. Flow follows your voice as you speak, so you stay present instead of chasing the scroll or memorizing every word.',
      },
      {
        question: 'Does Speakflow work in my browser?',
        answer:
          'Yes. Speakflow runs in modern browsers — write your script, open the teleprompter, and record without installing anything. Desktop apps are also available if you prefer a native experience.',
      },
      {
        question: 'Can my team collaborate on scripts?',
        answer:
          'Yes. Invite teammates to write, edit, and organize scripts in a shared workspace so everyone records from the same version.',
      },
      {
        question: 'What devices does Speakflow support?',
        answer:
          'Speakflow works on laptop, tablet, and phone. With Remote, you can control one screen from another — scroll your tablet from your phone, or run multiple displays from your computer.',
      },
      {
        question: 'Is there a free plan?',
        answer:
          'Yes. You can try Speakflow free to write scripts, use the teleprompter, and record. Paid plans add team features, advanced controls, and more storage as you scale.',
      },
      {
        question: 'How does voice-following work?',
        answer:
          'Flow listens to your voice and advances the script as you speak. If you pause or go off-script, it waits for you — so you can take your time and deliver at your own pace.',
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
          src: assetUrl('/images/blog/speakflow-guide.png'),
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
          src: assetUrl('/images/blog/follow-your-voice.png'),
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
          src: assetUrl('/images/blog/customize-your-teleprompter.png'),
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
        src: assetUrl('/images/cta/prompter.png'),
        alt: 'Illustration of a teleprompter on a tripod with a creator waving',
      },
      mic: {
        src: assetUrl('/images/cta/mic.png'),
        alt: 'Illustration of a creator sitting on a studio microphone',
      },
      laptop: {
        src: assetUrl('/images/cta/laptop.png'),
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
