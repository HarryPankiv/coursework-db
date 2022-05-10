import connectDatabase from "./db/connect";
import app from "./app";

app.listen(3001, async () => {
	try {
		await connectDatabase();
		console.log("App started at port: 3001");
	} catch (error) {
		console.log("App started with error:", error);
	}
});
