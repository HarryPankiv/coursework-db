import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class OrderDomain {
	create(data: any) {
		return api.makeRequest("api/order", RequestType.POST, data);
	}

	getAll() {
		return api.makeRequest("api/order", RequestType.GET);
	}
	
	getAllByWarehouseId(id: number) {
		return api.makeRequest(`api/order/${id}/all`, RequestType.GET);
	}

	getOne(id: number) {
		return api.makeRequest(`api/order/${id}`, RequestType.GET);
	}

	update(id: number, data: any) {
		return api.makeRequest(`api/order/${id}`, RequestType.PUT, data);
	}

	delete(id: number) {
		return api.makeRequest(`api/order/${id}`, RequestType.DELETE);
	}
}

export const orderDomain = new OrderDomain();
