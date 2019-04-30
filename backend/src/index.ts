import connectDatabase from "./db/connect";
import app from "./app";

app.listen(3001, async () => {
	try {
		await connectDatabase();
	} catch (error) {
		console.log("App started with error:", error);
	}
});
