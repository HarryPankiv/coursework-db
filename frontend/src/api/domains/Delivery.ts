import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class DeliveryDomain {
	getAll() {
		return api.makeRequest("api/delivery", RequestType.GET);
	}

	create(data: any) {
		return api.makeRequest("api/delivery", RequestType.POST, data);
	}

	getOne(id: number) {
		return api.makeRequest(`api/delivery/${id}`, RequestType.GET);
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/delivery/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/delivery/${id}`, RequestType.DELETE);
	}
}

export const deliveryDomain = new DeliveryDomain();
