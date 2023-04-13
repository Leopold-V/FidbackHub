export type feedbackType = {
  title: string;
  type: feedbackTypeType;
  description: string;
  author_email: string;
};

export type feedbackTypeType = 'General feedback' | 'Bug report' | 'Feature request';
