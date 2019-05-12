import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class DeliveryDomain {
	getDeliveries() {
		return api.makeRequest("api/delivery", RequestType.GET);
	}
}

export const deliveryDomain = new DeliveryDomain();
