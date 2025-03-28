import { Request, Response } from 'express';
import prisma from '../prisma';

export const getTasks = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
        const tasks = await prisma.task.findMany({ where: { userId } });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { title, description, dueDate } = req.body;
    if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                completed: false,
                userId,
            },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;
    try {
        const task = await prisma.task.updateMany({
            where: { id: Number(id), userId },
            data: { title, description, dueDate: new Date(dueDate), completed },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { id } = req.params;
    try {
        const task = await prisma.task.deleteMany({
            where: { id: Number(id), userId },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};
