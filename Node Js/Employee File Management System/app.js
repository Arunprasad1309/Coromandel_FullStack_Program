import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

// Create reports folder
await fs.mkdir("reports", { recursive: true });

// Employee file path
const filePath = path.join("reports", "employees.txt");

// Create Server
const server = http.createServer(async (req, res) => {

    if (req.url === "/") {

        res.end("Welcome to Employee Management System");

    }

    else if (req.url === "/add") {

        const employeeData = `
                ID : 101
                Name : Arun
                Department : Full Stack Developer

                ID : 102
                Name : Prasad
                Department : HR

         `;

        await fs.appendFile(filePath, employeeData);

        res.end("Employee Added Successfully");

    }

    else if (req.url === "/employees") {

        try {

            const data = await fs.readFile(filePath, "utf-8");
            res.end(data);

        } catch (err) {

            res.end("No employee records found.");

        }

    }

    else if (req.url === "/system") {

        const info = `

            Operating System : ${os.platform()}

            Architecture : ${os.arch()}

            Home Directory : ${os.homedir()}

            Total Memory : ${os.totalmem()}

            Free Memory : ${os.freemem()}
         `;

        res.end(info);

    }

    else {
        res.statusCode = 404;
        res.end("404 Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});