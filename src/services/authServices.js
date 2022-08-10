import { EMAIL_EXISTS, INVALID_CREDENTIALS, PASSWORD_DO_NOT_MATCH, USER_DOES_NOT_EXIST } from "../constants/errorTypes"

export const formatError = (error) => {
    switch (error.message) {
        case EMAIL_EXISTS:
            return 'Email already exists';
        case INVALID_CREDENTIALS:
            return 'The entered credentials are invalid';
        case PASSWORD_DO_NOT_MATCH:
            return 'The entered passwords do not match';
        case USER_DOES_NOT_EXIST:
            return 'The given information does not match any of our users';
        default:
            return 'Something bad happened';
    }
}
