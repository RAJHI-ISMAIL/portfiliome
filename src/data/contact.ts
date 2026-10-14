export interface ContactLink {
  label: string
  url: string
  icon: string
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'Email',
    url: 'mailto:ismail.rajhi@example.com',
    icon: 'mail',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/',
    icon: 'instagram',
  },
]