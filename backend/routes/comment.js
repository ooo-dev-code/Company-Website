import express from 'express';
import Comment from '../models/comment.js';

const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commentRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id).populate('author', 'username');
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commentRouter.post('/', async (req, res) => {
    const { content, author } = req.body;

    try {
        if (!content || !author) {
            return res.status(400).json({ error: 'Content and author are required' });
        }
        const comment = await Comment.create({ content, author });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commentRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, author, rates } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { content, author, rates }, { new: true });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

commentRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default commentRouter;
