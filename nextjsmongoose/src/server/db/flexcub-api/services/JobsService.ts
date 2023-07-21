/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateJobRequest } from '../models/CreateJobRequest';
import type { UpdateJobRequest } from '../models/UpdateJobRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JobsService {

    /**
     * Create Job
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static createJob(
requestBody: CreateJobRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/jobs',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get All Jobs
     * @returns any 
     * @throws ApiError
     */
    public static getAllJobs(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jobs',
        });
    }

    /**
     * Get Single Job
     * @param id The job ID
     * @returns any 
     * @throws ApiError
     */
    public static getSingleJob(
id: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jobs/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update Job
     * @param id The job ID
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static updateJob(
id: string,
requestBody: UpdateJobRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/jobs/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete Job
     * @param id The job ID
     * @returns any 
     * @throws ApiError
     */
    public static deleteJob(
id: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/jobs/{id}',
            path: {
                'id': id,
            },
        });
    }

}
