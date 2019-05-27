import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class UserDomain {
	create(data: any) {
		return api.makeRequest("api/user", RequestType.POST, data)
	}

	getAll() {
		return api.makeRequest("api/user", RequestType.GET);
	}

	getOne(id: number) {
		return api.makeRequest(`api/user/${id}`, RequestType.GET);
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/user/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/user/${id}`, RequestType.DELETE);
	}

	login(data: any) {
		return api.makeRequest("api/user/login", RequestType.GET, null, undefined, data)
	}
}

export const userDomain = new UserDomain();
