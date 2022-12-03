export type userType = {
    id: number;
    username: string;
    email: string;
    provider?: string;
    confirmed?: boolean,
    blocked?: boolean,
    createdAt?: string;
    updatedAt?: string;
    projects?: projectType[];
}

export type projectType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    github_url: string;
    website_url: string;
    error?: {
        status: number;
        name: string;
        message: string,
        details: {
            error: strapiErrorDetailType[]
        }
    }
}

export type strapiFetchErrorType = {
    data: null | any;
    error: {
        status: number;
        name: string;
        message: string,
        details: {
            error: strapiErrorDetailType[]
        }
    }
}

type strapiErrorDetailType = {
    path: string[];
    message: string;
}