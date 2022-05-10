import Axios, { AxiosInstance, AxiosPromise } from "axios";
import { RequestType, IKeyValue, IRequestHeaders, IApi } from "./adapterTypes";

class Api implements IApi {
	adapter: AxiosInstance;
	constructor() {
		this.adapter = Axios.create({
			baseURL: "http://localhost:3001",
		});
	}

	public makeRequest<T>(
		url: string,
		type: RequestType,
		payload?: any,
		headers: IRequestHeaders = {},
		queryParams: IKeyValue = {}
	): AxiosPromise<T> {
		switch (type) {
			case RequestType.GET:
				return this.adapter.get<T>(url, {
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					params: queryParams,
				});
			case RequestType.POST:
				return this.adapter.post<T>(url, payload, {
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					params: queryParams,
				});
			case RequestType.PUT:
				return this.adapter.put<T>(url, payload, {
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					params: queryParams,
				});
			case RequestType.PATCH:
				return this.adapter.patch<T>(url, payload, {
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					params: queryParams,
				});
			case RequestType.DELETE:
				return this.adapter.delete(url, {
					headers: {
						'Access-Control-Allow-Origin': '*'
					},
					params: queryParams,
				});
			default:
				return this.adapter.get<T>(url, { headers: {
					'Access-Control-Allow-Origin': '*'
				}, params: queryParams });
		}
	}
}

export const api = new Api();
