import express, { Application } from 'express'
import fileUpload from 'express-fileupload';
import cors from 'cors'
import responseTime from 'response-time'
import cookieParser from 'cookie-parser'
import authenticateRoutes from './routes/authenticate.routes.ts'
import helmet from 'helmet';


const app: Application = express()

// Middlewares
app.use(cors())
app.options('*', cors())

app.use(responseTime())
app.use(helmet());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// To upload PDF files
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    limits: { fileSize: 500000000 },
    abortOnLimit: true
}));

app.set("trust proxy", true)

// Load routes
app.use('/api', authenticateRoutes)

export default app