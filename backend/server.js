import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';


const app = express();
const prisma = new PrismaClient();

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());


// define an endpoint to fetch guestbook entries with pagination
app.get('/api/tguestbook', async (req, res) => {
  const { offset = 0, limit = 3 } = req.query;

  try {
    // get paginated messages
    const messages = await prisma.tguestbook.findMany({
      skip: Number(offset),      // Skip the number of entries based on the offset
      take: Number(limit),       // Limit the number of entries based on the limit
      orderBy: { id: 'desc' },
    });

    // get the total number of messages for pagination
    const totalCount = await prisma.tguestbook.count();

    // respond with the entries and total count for pagination
    res.json({
      entries: messages,
      total: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});


// define an endpoint to insert a new guestbook entry
app.post('/api/tguestbook', async (req, res) => {
  try {
    const { created_at, name, message, reaction } = req.body;

    // validate data
    if (!name || !message || typeof reaction !== 'number') {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // create a new entry in the database
    const newMessage = await prisma.tguestbook.create({
      data: {
        created_at,
        name,
        message,
        reaction,
      },
    });

    res.status(200).json(newMessage);
  } catch (error) {
    console.error('Error inserting entry:', error);
    res.status(500).json({ error: 'Failed to insert entry' });
  }
});


// Endpoint to delete a guestbook entry
app.delete('/api/tguestbook/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the URL parameter
  try {
    // Attempt to delete the entry from the database
    const deletedEntry = await prisma.tguestbook.delete({
      where: { id: Number(id) }, // Delete the entry with the specified ID
    });

    // Send a success response
    res.status(200).json(deletedEntry);
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
});

// start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
