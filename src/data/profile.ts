/**
 * Single source of truth for career facts, education, and profile links.
 * Dates, names, and summaries here come from the confirmed CV and packet;
 * do not add unverified claims.
 */

export interface ExperienceEntry {
  org: string;
  subject: string;
  title: string;
  start: string;
  end: string | 'present';
  location?: string;
  note?: string;
  summary: string;
}

export interface EducationEntry {
  org: string;
  qualification: string;
  completed: string;
  note?: string;
}

export interface ProfileLink {
  id: 'linkedin' | 'scholar' | 'github' | 'instagram';
  label: string;
  url: string;
}

export const profile = {
  name: 'Sourav Mohapatra',
  nickname: 'The Beng',
  role: 'Senior Software Engineer',
  company: 'Arm',
  experience: [
    {
      org: 'Arm',
      subject: 'Firmware and Android',
      title: 'Senior Software Engineer',
      start: 'March 2025',
      end: 'present',
      location: 'Cambridge, UK',
      summary:
        'At Arm, I work on platform bring-up and integration across firmware, Linux and Android. I’ve also co-delivered protected guest boot work using AVF and pKVM.',
    },
    {
      org: 'ASML',
      subject: 'Sensor drivers and diagnostics',
      title: 'Embedded Software Developer',
      start: 'September 2022',
      end: 'March 2025',
      summary:
        'At ASML, I wrote sensor drivers used across four machine platforms, along with Python calibration scripts and Qt5 diagnostic tools. I also supported a 12-person outsourced development team.',
    },
    {
      org: 'Qualcomm',
      subject: 'Linux Wi-Fi drivers',
      title: 'Embedded Engineer',
      start: 'June 2017',
      end: 'June 2020',
      note: 'Joined as Associate Engineer; promoted to Engineer.',
      summary:
        'At Qualcomm, I worked on Wi-Fi MAC protocols, kernel interfaces and communication between the scheduler and firmware. I used syzkaller for regression testing.',
    },
  ] as ExperienceEntry[],
  education: [
    {
      org: 'Delft University of Technology',
      qualification: 'MSc Embedded Systems',
      completed: 'September 2022',
      note: 'Graduated with distinction.',
    },
    {
      org: 'National Institute of Technology Rourkela',
      qualification: 'BTech Computer Science and Engineering',
      completed: 'May 2017',
    },
  ] as EducationEntry[],
  links: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/souravmohapatra/',
    },
    {
      id: 'scholar',
      label: 'Google Scholar',
      url: 'https://scholar.google.com/citations?hl=en&user=9c6V7nwAAAAJ',
    },
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/souravmohapatra',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/sourav.mohapatra_/',
    },
  ] as ProfileLink[],
};
