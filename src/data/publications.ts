/**
 * Research inventory. Verified against publisher records (see the planning
 * packet). The 2023 dataset candidate stays out until its primary record is
 * verified; it must not be presented as a paper or as Sourav's PhD work.
 */

export type PublicationKind = 'conference' | 'journal' | 'thesis';

export interface Publication {
  title: string;
  kind: PublicationKind;
  year: number;
  venue: string;
  venueShort?: string;
  detail?: string;
  authors?: string;
  explanation: string;
  url: string;
}

export const publications: Publication[] = [
  {
    title: 'Data Cache for Intermittent Computing Systems with Non-Volatile Main Memory',
    kind: 'conference',
    year: 2025,
    venue: 'ASPLOS',
    detail: 'Pages 227–243',
    explanation:
      'How should a data cache work when a device keeps losing power? We studied cache design for systems with non-volatile main memory.',
    url: 'https://doi.org/10.1145/3676641.3715989',
  },
  {
    title:
      'Schedulability of Rate Monotonic Algorithm using Improved Time Demand Analysis for Multiprocessor Environment',
    kind: 'journal',
    year: 2018,
    venue: 'International Journal of Electrical and Computer Engineering',
    venueShort: 'IJECE',
    detail: '8(1), 429–440',
    authors: 'Leena Das, Sourav Mohapatra, and Durga Prasad Mohapatra',
    explanation:
      'We studied how to reduce the analysis needed to check whether real-time tasks can meet their deadlines on multiprocessor systems.',
    url: 'https://doi.org/10.11591/ijece.v8i1.pp429-440',
  },
  {
    title: 'Efficient Memory Architecture for Next Generation Low-Power Embedded Systems',
    kind: 'thesis',
    year: 2022,
    venue: 'Delft University of Technology',
    venueShort: 'TU Delft',
    explanation:
      'My master’s thesis at TU Delft explored memory architecture for low-power embedded systems.',
    url: 'https://repository.tudelft.nl/file/File_51b0fa32-fc48-4611-8f4c-52416207f320',
  },
];
