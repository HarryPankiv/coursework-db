export const transformAddress = (address: { address: string; city: string }) =>
	address ? `${address.address}, ${address.city}`: '';