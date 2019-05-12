import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class StoreDomain {
	getStores() {
		return api.makeRequest("api/store", RequestType.GET);
	}

	getStore(id: number) {
		return api.makeRequest(`api/store/${id}`, RequestType.GET);
	}
}

export const storeDomain = new StoreDomain();
