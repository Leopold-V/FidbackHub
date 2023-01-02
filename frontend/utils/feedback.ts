import { feedbackStatusType } from "types/index";

export const feedbackColor = (status: feedbackStatusType) => {
    switch (status) {
        case "New":
            return "blue"
        case "In progress":
            return "yellow"
        case "Confirmed":
            return "green"
        case "Rejected":
            return "red"
        default:
            break;
    }
}