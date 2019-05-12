import { api } from "../adapter";
import { RequestType } from "../adapterTypes";

class UserDomain {
	getUsers() {
		return api.makeRequest("api/user", RequestType.GET);
	}
}

export const userDomain = new UserDomain();
