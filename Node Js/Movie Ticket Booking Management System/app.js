import http from "node:http"; // Import the built-in HTTP module for creating an HTTP server
import fs from "node:fs/promises"; // Import the built-in File System module with promises for file operations
import path from "node:path"; // Import the built-in Path module for handling and transforming file paths
import os from "node:os"; // Import the built-in OS module for operating system-related utility methods and properties
import { URL } from "node:url"; // Import the built-in URL module for URL resolution and parsing
import { createReadStream } from "node:fs"; // Import the createReadStream function from the built-in File System module for reading files as streams
import EventEmitter from "node:events"; // Import the built-in Events module for handling events and event-driven programming
import dns from "node:dns"; // Import the built-in DNS module for performing DNS lookups and name resolution
import crypto from "node:crypto"; // Import the built-in Crypto module for cryptographic operations and secure data handling
import { Buffer } from "node:buffer"; // Import the built-in Buffer module for handling binary data and manipulating raw memory
import { setTimeout } from "node:timers"; // Import the built-in Timers module for scheduling and managing timers

//Create Required Folders
await fs.mkdir("data", { recursive: true });
await fs.mkdir("reports", { recursive: true });

//Create File paths
const bookingFilePath = path.join("data", "bookings.txt");
const reportFilePath = path.join("reports", "bookings-report.txt");

// Create an EventEmitter instance for handling custom events
const eventEmitter = new EventEmitter();

//Create a Listener for the 'bookingCreated' event to log booking details to a file
eventEmitter.on("ticketBooked", (name) => {
  console.log(`Ticket booked for ${name}`);
});

// Create an HTTP server 
const server = http.createServer(async (req, res) => {
 
  //Home Route
  if (req.url === "/") {
    res.end(`
        Welcome to Movie Ticket Booking Management System

        Available Routes:

        1. Book Ticket:
        /book-ticket?name=Arun&movie=Leo&seats=2

        2. View All Bookings:
        /bookings

        3. Booking Report:
        /report

        4. System Information:
        /system

        5. Domain Verification:
        /domain?name=google.com

        6. Buffer Demo:
        /buffer?text=hello
        `);
}

  //Book Ticket Route
    else if (req.url.startsWith("/book-ticket")) {
        //Parse URL to get query parameters
        const url = new URL(req.url, `http://${req.headers.host}`);
        //Extract query parameters for name, movie, and seats
        const name = url.searchParams.get("name");
        const movie = url.searchParams.get("movie");
        const seats = url.searchParams.get("seats");

        //Validate query parameters
        if (!name || !movie || !seats) {
            res.statusCode = 400;
            res.end("Missing required query parameters: name, movie, seats");
            return;
        }

        //Generate a unique booking ID using crypto module
        const bookingId = crypto.randomUUID();

        //Create a booking object with the provided details 
        const bookingData = `
            Booking ID: ${bookingId}
            Name: ${name}
            Movie: ${movie}
            Seats: ${seats}
        `;
        
        //Write the booking data to the bookings file

        await fs.appendFile(bookingFilePath, bookingData);

        //save the booking data to the report file
        await fs.appendFile(reportFilePath, bookingData);

        //Trigger Custom Event for ticket booking
        eventEmitter.emit("ticketBooked", name);

        //Delay the confirmation message
        setTimeout(() => {
            console.log(`Booking confirmed for ${name}`);
        },3000); // 3 seconds delay

        //send response
        res.end(`Booking confirmed for ${name}. Booking ID: ${bookingId}`);
    }

    //View All Bookings Route
    else if (req.url === "/view-bookings") {
        try {
            //Read the bookings file and send its content as response
            const bookings = await fs.readFile(bookingFilePath, "utf-8");
            res.end(bookings);
        } catch (error) {
            res.statusCode = 500;
            res.end("Error reading bookings file");
        }  
    }

    //Bookings Report stream route
    else if (req.url === "/bookings-report") {
        try {
            //Create a read stream for the report file
            const readStream = createReadStream(reportFilePath);
            readStream.pipe(res);//Pipe the read stream to the response to send the report file content

        } catch (error) {
            res.statusCode = 404;
            res.end("Report file not found");
        }
    }

    //System Information Route
    else if (req.url === "/system") {

        const systemInfo = `
            Operating System: ${os.platform()}
            Architecture: ${os.arch()}
            Hostname: ${os.hostname()}
            Home Directory: ${os.homedir()}
            Total Memory: ${os.totalmem()}
            Free Memory: ${os.freemem()}
            `;
            
        res.end(systemInfo);

    }
    //Domain Name System (DNS) verification Lookup Route
    else if (req.url.startsWith("/domain")) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const domain = url.searchParams.get("name");
        //Validate if the domain name is provided in the query parameters
        if (!domain) {
            res.end("Please provide a domain name\n Usage: /domain?name=example.com"); 
            return;
        }
        //Perform DNS lookup for the provided domain name
        dns.lookup(domain, (error, address) => {

        if (error) {
            res.end("Invalid domain");
            return;
        }
        //Send the resolved IP address of the domain in the response
        res.end(`Domain: ${domain}\nIP Address: ${address}`);
        });
    }

    //Buffer Example Route
    else if (req.url.startsWith("/buffer")) {

        const myURL = new URL(req.url, "http://localhost:3000");

        const text = myURL.searchParams.get("text");

        if (!text) {
            res.end("Please provide text\nUsage: /buffer?text=hello");
            return;
        }

        // Convert text to buffer
        const bufferData = Buffer.from(text);

        // Convert buffer back to text
        const decodedText = bufferData.toString();

        res.end(
            `Original Text: ${text}\n` +
            `Buffer: ${bufferData}\n` +
            `Decoded Text: ${decodedText}`
        );

    }
  
    else {
        res.statusCode = 404;
        res.end("404 Not Found");       
    }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Export the server for testing or further usage
export default server; 