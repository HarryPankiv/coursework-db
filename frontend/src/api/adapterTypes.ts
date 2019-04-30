import { AxiosInstance, AxiosPromise } from "axios";

export enum RequestType {
	GET = "GET",
	POST = "POST",
	PATCH = "PATCH",
	DELETE = "DELETE",
	PUT = "PUT",
}

export interface IKeyValue {
	[key: string]: any;
}

export interface IRequestHeaders {
	[key: string]: string;
}

export interface IApi {
	adapter: AxiosInstance;
	makeRequest: <T>(
		url: string,
		type: RequestType,
		payload?: any,
		headers?: IRequestHeaders,
		queryParams?: IKeyValue
	) => AxiosPromise<T>;
}
