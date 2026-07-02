
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { URL } from "node:url";
import EventEmitter from "node:events";
import { createReadStream } from "node:fs";

// Create data folder
await fs.mkdir("data", { recursive: true });

// File path
const filePath = path.join("data", "participants.txt");

// Create event emitter
const emitter = new EventEmitter();

// Event listener
emitter.on("participantRegistered", (name) => {
    console.log(`New participant registered: ${name}`);
});

// Create server
const server = http.createServer(async (req, res) => {

    // Home route
    if (req.url === "/") {

        res.end(`<h1>Welcome to the Workshop Registration System</h1>

            <p>To register for the workshop, please visit <a href="/register">/register</a></p>

            <p>To view the list of registered participants, please visit <a href="/participants">/participants</a></p>
            
            <p>To view the system information, please visit <a href="/system">/system</a></p>
            
            <P>To download the report of registered participants, please visit <a href="/download-report">/download-report</a></p>
        
        `);
    }
    // Register participant
    else if (req.url.startsWith("/register")) {

        const myURL = new URL(req.url, "http://localhost:3000");

        const name = myURL.searchParams.get("name");
        const course = myURL.searchParams.get("course");

        if (!name || !course) {
            res.end("Please provide both name and course"
                + "\nUsage: /register?name=Ali&course=NodeJS"
            );
            return;
        }

        const participantData = `
            Name: ${name}
            
            Course: ${course}
            `;

        await fs.appendFile(filePath, participantData);

        // Trigger event
        emitter.emit("participantRegistered", name);

        res.end("Participant registered successfully");
    }

    // Show all participants
    else if (req.url === "/participants") {
        try {
            const data = await fs.readFile(filePath, "utf-8");
            res.end(data);
        } catch (err) {
            res.end("No participants found");
        }
    }

    // System information
    else if (req.url === "/system") {
        const systemInfo = `

            Operating System: ${os.platform()}

            Architecture: ${os.arch()}

            Hostname: ${os.hostname()}

            Home Directory: ${os.homedir()}
        `;

        res.end(systemInfo);
    }

    // Download report using stream
    else if (req.url === "/download-report") {
        try {
            const stream = createReadStream(filePath);
            stream.pipe(res);
        } catch (err) {
            res.end("Report file not found");
        }
    }

    // Invalid route
    else {
        res.statusCode = 404;
        res.end("404 Page Not Found");
    }

});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
