import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'


export const authMiddleware = (req: Request, res: Response, next: any) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' })
    }
    const authPassword = process.env.PASSWORD || '1337'
    if (password !== authPassword) {
        return res.status(401).json({ error: 'wrong password' })
    }
    next()
}