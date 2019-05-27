import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class WarehouseDomain {
	getAll() {
		return api.makeRequest("api/warehouse", RequestType.GET);
	}

	getOne(id: number) {
		return api.makeRequest(`api/warehouse/${id}`, RequestType.GET);
	}

	create(data: any) {
		return api.makeRequest("api/warehouse", RequestType.POST, data)
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/warehouse/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/warehouse/${id}`, RequestType.DELETE);
	}
}

export const warehouseDomain = new WarehouseDomain();
