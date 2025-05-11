import express from 'express';
import Rate from '../models/rate.js';

const rateRouter = express.Router();

rateRouter.get('/', async (req, res) => {
    try {
        const rates = await Rate.find();
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rateRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const rate = await Rate.findById(id);
        if (!rate) {
            return res.status(404).json({ error: 'Rate not found' });
        }
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rateRouter.post('/', async (req, res) => {
    const { rate } = req.body;

    try {
        if (rate === undefined) {
            return res.status(400).json({ error: 'Rate is required' });
        }
        const newRate = await Rate.create({ rate });
        res.status(201).json(newRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rateRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;

    try {
        const updatedRate = await Rate.findByIdAndUpdate(id, { rate }, { new: true });
        if (!updatedRate) {
            return res.status(404).json({ error: 'Rate not found' });
        }
        res.status(200).json(updatedRate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

rateRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRate = await Rate.findByIdAndDelete(id);
        if (!deletedRate) {
            return res.status(404).json({ error: 'Rate not found' });
        }
        res.status(200).json({ message: 'Rate deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default rateRouter;