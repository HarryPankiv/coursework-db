import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection({
	name: "default",
	type: "mssql",
	host: "localhost",
	port: 1433,
	schema: "dbo",
	username: "Harry",
	password: "harrypass",
	database: "HarryPankiv",
	synchronize: true,
	logging: true,
	entities: [__dirname + "/entities/*.ts"],
})
	.then(async connection => {
		console.log("midas touch, yup");
	})
	.catch(error => console.log(error));
