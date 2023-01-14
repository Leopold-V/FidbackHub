export type userType = {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  projects?: projectType[];
  error?: {
    status: number;
    name: string;
    message: string;
    details: {
      errors: strapiErrorDetailType[];
    };
  };
};

export type projectType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  github_url: string;
  website_url: string;
  feedbacks?: feedbackType[];
  api_key?: string;
  members?: userType[];
  error?: {
    status: number;
    name: string;
    message: string;
    details: {
      errors: strapiErrorDetailType[];
    };
  };
};

export type feedbackType = {
  id: number;
  title: string;
  description: string;
  author_email: string;
  status: feedbackStatusType;
  state: feedbackStateType;
  type: feedbackTypeType;
  screenshot?: string;
  user_ipv4?: string;
  createdAt?: Date;
  error?: {
    state: number;
    name: string;
    message: string;
    details: {
      errors: strapiErrorDetailType[];
    };
  };
};

export type strapiFetchErrorType = {
  data: null | any;
  error: {
    status: number;
    name: string;
    message: string;
    details: {
      error: strapiErrorDetailType[];
    };
  };
};

type strapiErrorDetailType = {
  path: string[];
  message: string;
};

/**
 * The current **state** of a feedback
 */
export type feedbackStatusType = 'Open' | 'Closed';

/**
 * The current **status** of a feedback
 */
export type feedbackStateType = 'New' | 'In progress' | 'Resolved' | 'Rejected';

/**
 * The possible **type** of a feedback
 */
export type feedbackTypeType = 'General feedback' | 'Bug report' | 'Feature request';
