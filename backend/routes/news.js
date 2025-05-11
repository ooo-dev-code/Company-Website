import express from 'express';
import multer from 'multer';
import path from 'path';
import News from '../models/News.js'; 

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    try {
        const news = await News.find().populate('author', 'username');
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

newsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findById(id).populate('author', 'username');
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Set up multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // add timestamp
    }
});

const upload = multer({ storage: storage });

// POST route to create news
newsRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const image = req.file ? req.file.filename : null;

        const newNews = new News({ title, content, image, author });
        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating news' });
    }
});



newsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, image, author } = req.body;

    try {
        const news = await News.findByIdAndUpdate(id, { title, content, image, author }, { new: true });
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

newsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default newsRouter;