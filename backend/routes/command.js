import express from 'express';
import Command from '../models/commands.js';
import nodemailer from 'nodemailer';

const commandRouter = express.Router();

commandRouter.get('/', async (req, res) => {
    try {
        const commands = await Command.find();
        res.status(200).json(commands);
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

commandRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const command = await Command.findById(id);
        if (!command) {
            return res.status(404).json({ error: 'Command not found' });
        }
        res.status(200).json(command);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commandRouter.post('/', async (req, res) => {
    try {
        const { from, to, title, description, language, database } = req.body;

        if (!from || !to || !title || !description || !language || !database) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const command = await Command.create({ from, to, title, description, language, database });

        res.status(201).json(command);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


commandRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { from, to, title, description, language, database } = req.body;

    try {
        const command = await Command.findByIdAndUpdate(
            id,
            { from, to, title, description, language, database },
            { new: true }
        );
        if (!command) {
            return res.status(404).json({ error: 'Command not found' });
        }
        res.status(200).json(command);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commandRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const command = await Command.findByIdAndDelete(id);
        if (!command) {
            return res.status(404).json({ error: 'Command not found' });
        }
        res.status(200).json({ message: 'Command deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default commandRouter;