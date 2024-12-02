/**
 * Swagger Petstore - OpenAPI 3.0
 * This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we've switched to the design first approach! You can now help us improve the API whether it's by making changes to the definition itself or to the code. That way, with time, we can improve the API in general, and expose some of the new features in OAS3.  Some useful links: - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore) - [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/main/src/main/resources/openapi.yaml) 
 *
 * OpenAPI spec version: 1.0.4
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { User } from '../model/user';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserService {

    protected basePath = '/api/v3';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create user
     * This can only be done by the logged in user.
     * @param body Created user object
     * @param id 
     * @param username 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param password 
     * @param phone 
     * @param userStatus 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUser(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public createUser(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public createUser(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public createUser(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {










        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/xml',
            'application/x-www-form-urlencoded'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<User>('post',`${this.basePath}/user`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Create user
     * This can only be done by the logged in user.
     * @param body Created user object
     * @param id 
     * @param username 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param password 
     * @param phone 
     * @param userStatus 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUserForm(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public createUserForm(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public createUserForm(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public createUserForm(body?: User, id?: number, username?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {










        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json',
            'application/xml'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/xml',
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (id !== undefined) {
            formParams = formParams.append('id', <any>id) as any || formParams;
        }
        if (username !== undefined) {
            formParams = formParams.append('username', <any>username) as any || formParams;
        }
        if (firstName !== undefined) {
            formParams = formParams.append('firstName', <any>firstName) as any || formParams;
        }
        if (lastName !== undefined) {
            formParams = formParams.append('lastName', <any>lastName) as any || formParams;
        }
        if (email !== undefined) {
            formParams = formParams.append('email', <any>email) as any || formParams;
        }
        if (password !== undefined) {
            formParams = formParams.append('password', <any>password) as any || formParams;
        }
        if (phone !== undefined) {
            formParams = formParams.append('phone', <any>phone) as any || formParams;
        }
        if (userStatus !== undefined) {
            formParams = formParams.append('userStatus', <any>userStatus) as any || formParams;
        }

        return this.httpClient.request<User>('post',`${this.basePath}/user`,
            {
                body: convertFormParamsToString ? formParams.toString() : formParams,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates list of users with given input array
     * Creates list of users with given input array
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsersWithListInput(body?: Array<User>, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public createUsersWithListInput(body?: Array<User>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public createUsersWithListInput(body?: Array<User>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public createUsersWithListInput(body?: Array<User>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/xml',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<User>('post',`${this.basePath}/user/createWithList`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete user
     * This can only be done by the logged in user.
     * @param username The name that needs to be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUser(username: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteUser(username: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteUser(username: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteUser(username: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling deleteUser.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/user/${encodeURIComponent(String(username))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get user by user name
     * 
     * @param username The name that needs to be fetched. Use user1 for testing. 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserByName(username: string, observe?: 'body', reportProgress?: boolean): Observable<User>;
    public getUserByName(username: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<User>>;
    public getUserByName(username: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<User>>;
    public getUserByName(username: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling getUserByName.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/xml',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<User>('get',`${this.basePath}/user/${encodeURIComponent(String(username))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Logs user into the system
     * 
     * @param username The user name for login
     * @param password The password for login in clear text
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public loginUser(username?: string, password?: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public loginUser(username?: string, password?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public loginUser(username?: string, password?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public loginUser(username?: string, password?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/xml',
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<string>('get',`${this.basePath}/user/login`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Logs out current logged in user session
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public logoutUser(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public logoutUser(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public logoutUser(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public logoutUser(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/user/logout`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update user
     * This can only be done by the logged in user.
     * @param username name that need to be deleted
     * @param body Update an existent user in the store
     * @param id 
     * @param username2 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param password 
     * @param phone 
     * @param userStatus 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUser(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateUser(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateUser(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateUser(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling updateUser.');
        }










        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/xml',
            'application/x-www-form-urlencoded'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/user/${encodeURIComponent(String(username))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update user
     * This can only be done by the logged in user.
     * @param username name that need to be deleted
     * @param body Update an existent user in the store
     * @param id 
     * @param username2 
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param password 
     * @param phone 
     * @param userStatus 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUserForm(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateUserForm(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateUserForm(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateUserForm(username: string, body?: User, id?: number, username2?: string, firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, userStatus?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling updateUser.');
        }










        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'application/xml',
            'application/x-www-form-urlencoded'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (id !== undefined) {
            formParams = formParams.append('id', <any>id) as any || formParams;
        }
        if (username !== undefined) {
            formParams = formParams.append('username', <any>username) as any || formParams;
        }
        if (firstName !== undefined) {
            formParams = formParams.append('firstName', <any>firstName) as any || formParams;
        }
        if (lastName !== undefined) {
            formParams = formParams.append('lastName', <any>lastName) as any || formParams;
        }
        if (email !== undefined) {
            formParams = formParams.append('email', <any>email) as any || formParams;
        }
        if (password !== undefined) {
            formParams = formParams.append('password', <any>password) as any || formParams;
        }
        if (phone !== undefined) {
            formParams = formParams.append('phone', <any>phone) as any || formParams;
        }
        if (userStatus !== undefined) {
            formParams = formParams.append('userStatus', <any>userStatus) as any || formParams;
        }

        return this.httpClient.request<any>('put',`${this.basePath}/user/${encodeURIComponent(String(username))}`,
            {
                body: convertFormParamsToString ? formParams.toString() : formParams,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}