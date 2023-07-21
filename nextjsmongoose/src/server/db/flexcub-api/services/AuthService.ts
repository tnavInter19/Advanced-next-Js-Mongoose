/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserRequest } from '../models/LoginUserRequest';
import type { RegisterUserRequest } from '../models/RegisterUserRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Register User
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static registerUser(
requestBody: RegisterUserRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Login User
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static loginUser(
requestBody: LoginUserRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
