import "reflect-metadata";
import { createConnection } from "typeorm";

const connectDatabase = async () => {
	await createConnection();
};

export default connectDatabase;
