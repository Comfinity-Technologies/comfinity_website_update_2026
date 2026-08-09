import { ShieldCheck, Rocket, Handshake, Brain, Lightbulb, Users } from 'lucide-react'

export const whoWeAre = {
  section: { number: '01', title: 'WHO WE ARE' },
  heading: { pre: 'Who We ', emphasis: 'Are.' },
  portrait: {
    src: 'https://res.cloudinary.com/dwyxalvqt/image/upload/v1722800000/sajith_portrait.jpg',
    alt: 'Comfinity Leadership',
  },
  about: {
    label: 'ABOUT US',
    body: 'We are a team of technology enthusiasts and industry experts, committed to helping organizations turn complexity into clarity and ideas into measurable impact.',
  },
  mission: {
    label: 'OUR MISSION',
    items: [
      { icon: ShieldCheck, text: 'Understand Before We Build' },
      { icon: Rocket, text: 'Drive Meaningful Innovation' },
      { icon: Handshake, text: 'Build Long-Term Partnerships' },
    ],
  },
  vision: {
    label: 'OUR VISION',
    items: [
      { icon: Brain, text: 'TRANSFORM CHALLENGES INTO INTELLIGENCE' },
      { icon: Lightbulb, text: 'TURN IDEAS INTO IMPACT' },
      { icon: Users, text: 'BUILD THE FUTURE TOGETHER' },
    ],
  },
}

export const contents = {
  section: { number: '02', title: 'CONTENTS' },
  heading: 'Contents.',
  quote: 'From complexity to clarity. From ideas to impact.',
  gallery: [
    { src: '/images/why-us-team.png', alt: 'Modern Office' },
    { src: '/images/why-us-team.png', alt: 'Team Collaboration' },
    { src: '/images/why-us-team.png', alt: 'Conference Room' },
    { src: '/images/why-us-team.png', alt: 'Tech Workspace' },
  ],
  entries: [
    { number: '01', title: 'Business First' },
    { number: '02', title: 'Innovation with Purpose' },
    { number: '03', title: 'Partnership & Trust' },
    { number: '04', title: 'Excellence in Execution' },
    { number: '05', title: 'Continuous Learning' },
    { number: '06', title: 'Integrity' },
  ],
  callout: {
    quote: 'Things get interesting when you flip it.',
    site: 'COMFINITYINDIA.COM',
  },
  editorsNote: {
    label: "EDITOR'S NOTE",
    body: 'Welcome to our digital publication. Explore our story, vision, capabilities, and client partnerships.',
  },
}
