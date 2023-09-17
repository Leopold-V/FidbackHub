export type feedbackType = {
  title: string;
  type: feedbackTypeType;
  description: string;
  author_email: string;
};

export type metadataType = {
  userAgent: string; 
  resolutionWidth: number;
  resolutionHeight: number; 
  os: string;
}

export type feedbackTypeType = 'General feedback' | 'Bug report' | 'Feature request';
