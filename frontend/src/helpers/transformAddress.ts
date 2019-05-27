export const transformAddress = (address: { address: string; city: string } | undefined) =>
	address && `${address.address}, ${address.city} `;
