// Centralized mock data for Jumaa sermons
export const sermons = [
  {
    id: 1,
    title: 'Community and Brotherhood in Islam',
    link: 'https://youtu.be/muBIszaQTU4?si=pqs9g53Ez-RSNGpI',
    language: 'English',
    description: 'Reflecting on unity, support, and responsibility within our community. This khutbah explores practical ways to strengthen bonds, uphold justice, and nurture compassion among Muslims in Budapest and beyond. Extended reflections include actionable steps and relevant Qur’anic guidance to embody brotherhood daily.',
    imam: 'Imam Example',
    date: '2025-01-24'
  },
  {
    id: 2,
    title: 'Patience and Gratitude',
    link: 'https://youtu.be/Q_Zhm1k51Ug?si=nzQNrVqt6AgodXJ6',
    language: 'English',
    description: 'Balancing patience during trials with gratitude for blessings. The sermon highlights practical dhikr, mindset, and routines that keep hearts steady.',
    imam: 'Imam A',
    date: '2025-01-17'
  },
  {
    id: 3,
    title: 'The Rights of Neighbors',
    link: 'https://youtu.be/MA0RX1ecPN4?si=A2W0dX2T_cp83hIl',
    language: 'Arabic',
    description: 'Understanding our obligations and kindness towards neighbors, Muslim and non-Muslim alike, with prophetic examples and modern applications.',
    imam: 'Imam B',
    date: '2025-01-10'
  },
  {
    id: 4,
    title: 'Salah: The Pillar of Faith',
    link: 'https://youtu.be/CiOKonbpwLQ?si=dLog4rSBJi3CLYLT',
    language: 'Hungarian',
    description: 'Reinforcing the importance and khushu in daily prayers, addressing common obstacles, and cultivating presence before Allah.',
    imam: 'Imam C',
    date: '2025-01-03'
  },
  {
    id: 5,
    title: 'Charity and Community Support',
    link: 'https://youtu.be/lZSf4SnynJw?si=xf_wtoV7bbZKy-Rg',
    language: 'English',
    description: 'Encouraging generosity and practical avenues for charity to uplift our local community with sincerity and impact.',
    imam: 'Imam D',
    date: '2024-12-27'
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));


