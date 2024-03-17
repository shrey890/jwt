import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import likesRoutes from './routes/likes.js'
import authRoutes from './routes/auth.js'
import commentsRoutes from './routes/comments.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())    
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/auth', authRoutes)    
app.use('/api/likes', likesRoutes)
app.listen(8800, () => {
    console.log('listening on 8800')
})