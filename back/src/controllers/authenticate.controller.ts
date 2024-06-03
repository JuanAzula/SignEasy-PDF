import { Request, Response } from "express";


const authenticate = (req: Request, res: Response) => {
    // Logic to generate and access and refresh token to send back with cookies
    res.status(200).json({ message: 'authenticated' })
}


export { authenticate }