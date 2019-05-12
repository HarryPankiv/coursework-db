import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class WarehouseDomain {
	getUsers() {
		return api.makeRequest("api/warehouse", RequestType.GET);
	}
}

export const warehouseDomain = new WarehouseDomain();
