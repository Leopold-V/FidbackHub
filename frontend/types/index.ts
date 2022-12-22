export type userType = {
    id: number;
    username: string;
    email: string;
    avatar_url?: string;
    provider?: string;
    confirmed?: boolean,
    blocked?: boolean,
    createdAt?: string;
    updatedAt?: string;
    projects?: projectType[];
    error?: {
        status: number;
        name: string;
        message: string,
        details: {
            errors: strapiErrorDetailType[]
        }
    }
}

export type projectType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    github_url: string;
    website_url: string;
    ratings?: ratingType[];
    api_key?: string;
    error?: {
        status: number;
        name: string;
        message: string,
        details: {
            errors: strapiErrorDetailType[]
        }
    }
}

export type ratingType = {
    id: number;
    design: number;
    speed: number;
    responsive: number;
    average: number;
    createdAt?: Date;
    error?: {
        status: number;
        name: string;
        message: string,
        details: {
            errors: strapiErrorDetailType[]
        }
    }
}

export type ratingCategories = 'design' | 'speed' | 'responsive'

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