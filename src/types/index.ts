export type SectionType = 
  | 'overview' 
  | 'academic' 
  | 'opportunities' 
  | 'learning' 
  | 'tools' 
  | 'community'
  | 'saved';

export type UniversityCode = 
  | 'ALL'
  | 'UoN' 
  | 'KU' 
  | 'JKUAT' 
  | 'Strathmore' 
  | 'Moi' 
  | 'Egerton' 
  | 'TUK' 
  | 'USIU'
  | 'Other';

export type AcademicCategory = 
  | 'ALL'
  | 'Computer Science & IT'
  | 'Engineering & Technology'
  | 'Business & Economics'
  | 'Health Sciences & Medicine'
  | 'Law & Governance'
  | 'Applied Sciences';

export type AcademicItemType = 'Past Exam Paper' | 'Marking Scheme' | 'Lecture Revision Notes' | 'Practical Lab Guide';

export interface AcademicResource {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  university: UniversityCode;
  faculty: AcademicCategory;
  yearOfStudy: number;
  semester: number;
  academicYear: string;
  type: AcademicItemType;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  downloadsCount: number;
  contributor: string;
  verified: boolean;
  summary: string;
  keyTopics: string[];
  sampleQuestions?: string[];
}

export type OpportunityType = 'Scholarship' | 'Industrial Attachment' | 'Internship' | 'Graduate Trainee' | 'Hackathon' | 'Bursary';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  location: string;
  stipendOrCoverage: string;
  isPaidOrFunded: boolean;
  deadline: string;
  eligibility: string[];
  description: string;
  applicationLink: string;
  targetStudents: string;
  verified: boolean;
  featured?: boolean;
}

export interface LearningRoadmap {
  id: string;
  title: string;
  domain: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  certificateOffered: boolean;
  provider: string;
  description: string;
  modules: {
    title: string;
    description: string;
    link: string;
    freeStatus: '100% Free' | 'Audit Free' | 'Financial Aid Available';
  }[];
  kenyanRelevanceTip: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  organizer: string;
  type: 'In-Person' | 'Virtual' | 'Hybrid';
  venue: string;
  date: string;
  time: string;
  category: 'Tech & Coding' | 'Career & Mentorship' | 'Innovation & Hackathon' | 'Campus Life';
  rsvpLink: string;
  description: string;
  speakers: string[];
  spotsRemaining: number;
}

export interface ForumQuestion {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  university: string;
  timestamp: string;
  category: string;
  content: string;
  upvotes: number;
  answersCount: number;
  answers: {
    id: string;
    author: string;
    authorRole: string;
    university: string;
    timestamp: string;
    content: string;
    isAccepted?: boolean;
  }[];
}

export interface CourseGradeItem {
  id: string;
  unitCode: string;
  unitName: string;
  creditHours: number;
  score: number; // 0 to 100
}

export interface BudgetItem {
  id: string;
  category: string;
  allocatedKES: number;
  notes: string;
}
