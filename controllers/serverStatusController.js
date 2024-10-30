import asyncHandler from "express-async-handler";

// Route to check if server is running
const serverRunning = asyncHandler(async (req, res) => {
    res.send("Server is running");
});

// Route to get server status details
const serverStatus = asyncHandler(async (req, res) => {
    const uptime = process.uptime(); // Server uptime in seconds
    const memoryUsage = process.memoryUsage(); // Memory usage details in bytes

    const status = {
        message: "Server is running",
        uptime: `${Math.floor(uptime / 60)} minutes ${Math.floor(uptime % 60)} seconds`,
        memoryUsage: {
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,         // Resident Set Size
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
        },
    };

    res.json(status);
});

export { serverRunning, serverStatus };
