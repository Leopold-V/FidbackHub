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

export type historyType = {
  id: number;
  content_type: 'feedback' | 'project' | 'user';
  action: string;
  author: userType;
  project: projectType;
  content: {
    attribut: string;
    value: string;
  };
  content_id: number;
  createdAt: string;
  updatedAt: string;
};

export type projectType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  github_url: string;
  website_url: string;
  feedbacks?: feedbackType[];
  api_key?: string;
  members?: userType[];
  user?: userType;
  error?: {
    status: number;
    name: string;
    message: string;
    details: {
      errors: strapiErrorDetailType[];
    };
  };
};

export type commentType = {
  type?: 'commment' | 'history';
  id: number;
  content: string;
  author: string;
  user_avatar: string;
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

export type feedbackType = {
  id: number;
  title: string;
  description: string;
  author_email: string;
  comments?: commentType[];
  status: feedbackStatusType;
  state: feedbackStateType;
  type: feedbackTypeType;
  priority: feedbackPriorityType;
  screenshot?: string;
  metadata?: metadataType;
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

/**
 * The priority **level** of a feedback
 */
export type feedbackPriorityType = 'Low' | 'Very low' | 'Medium' | 'High' | 'Very high';

export type metadataType = {
  userAgent: string;
  resolutionWidth: number;
  resolutionHeight: number;
  os: string;
};
