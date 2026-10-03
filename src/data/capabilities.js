import {
  faArrowUpRightFromSquare,
  faDatabase,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export const capabilities = [
  {
    number: '01',
    icon: faTerminal,
    title: 'MCP server access',
    description: 'Connect applications and AI agents to Q through Model Context Protocol endpoints.',
    link: 'Explore MCP protocol specs',
  },
  {
    number: '02',
    icon: faArrowUpRightFromSquare,
    title: 'Ordering & commerce APIs',
    description: 'Build ordering, commerce, and transaction experiences using scalable APIs.',
    link: 'View payment docs',
  },
  {
    number: '03',
    icon: faWhatsapp,
    title: 'WhatsApp agent tooling',
    description: 'Build helpful WhatsApp agents for customers and businesses.',
    link: 'Build WhatsApp agents',
  },
  {
    number: '04',
    icon: faDatabase,
    title: 'Business data',
    description: 'Use business data to power useful apps, analytics, and AI agents.',
    link: 'Browse data catalogs',
  },
]
