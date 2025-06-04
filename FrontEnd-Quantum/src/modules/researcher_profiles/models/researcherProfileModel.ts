export interface ResearcherProfileBase {
  skills: string;
  topics: string;
  publications: string;
}

export interface ResearcherProfileCreate extends ResearcherProfileBase {}

export interface ResearcherProfileOut extends ResearcherProfileBase {
  id: number;
  user_id: number;
}
