import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class StoreDomain {
	getAll() {
		return api.makeRequest("api/store", RequestType.GET);
	}

	getOne(id: number) {
		return api.makeRequest(`api/store/${id}`, RequestType.GET);
	}

	create(data: any) {
		return api.makeRequest("api/store", RequestType.POST, data);
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/store/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/store/${id}`, RequestType.DELETE);
	}
}

export const storeDomain = new StoreDomain();
