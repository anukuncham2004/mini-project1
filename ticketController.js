const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tickets.json");

// Get all tickets
const getTickets = (req, res) => {
    const data = fs.readFileSync(filePath);
    const tickets = JSON.parse(data);
    res.json(tickets);
};

// Create new ticket
const createTicket = (req, res) => {
    const data = fs.readFileSync(filePath);
    const tickets = JSON.parse(data);

    const newTicket = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: "Open"
    };

    tickets.push(newTicket);

    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

    res.status(201).json(newTicket);
};

// Update ticket status
const updateTicket = (req, res) => {
    const data = fs.readFileSync(filePath);
    let tickets = JSON.parse(data);

    tickets = tickets.map(ticket => {
        if (ticket.id == req.params.id) {
            ticket.status = req.body.status;
        }
        return ticket;
    });

    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

    res.json({ message: "Ticket updated" });
};

// Delete ticket
const deleteTicket = (req, res) => {
    const data = fs.readFileSync(filePath);
    let tickets = JSON.parse(data);

    tickets = tickets.filter(ticket => ticket.id != req.params.id);

    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

    res.json({ message: "Ticket deleted" });
};

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
};