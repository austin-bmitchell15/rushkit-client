import { EMAIL_EXISTS, INVALID_CREDENTIALS, PASSWORD_DO_NOT_MATCH } from "../constants/errorTypes"

export const formatError = (error) => {
    switch (error.message) {
        case EMAIL_EXISTS:
            return 'Email already exists';
        case INVALID_CREDENTIALS:
            return 'The entered credentials are invalid';
        case PASSWORD_DO_NOT_MATCH:
            return 'The entered passwords do not match';
        default:
            return 'Something bad happened';
    }
}
