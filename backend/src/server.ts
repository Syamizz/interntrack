import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'

//use prisma
import { prisma } from './db.js'

//use bcrypt
import bcrypt from 'bcrypt'

//for jsonwebtoken
import jwt from 'jsonwebtoken'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

//validate token
const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  const token = authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Access token required',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: number
      email: string
    }

    res.locals.userId = decoded.userId

    next()
  } catch {
    return res.status(403).json({
      message: 'Invalid or expired token',
    })
  }
}


//home
app.get('/', (req, res) => {
  res.send('InternTrack API is running')
})



//get data
app.get('/api/applications', authenticateToken, async (req, res) => {
  try {
    //same like select all
    const applications = await prisma.application.findMany({
      where: {
        userId: res.locals.userId,
      },
    })

    res.json(applications)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to fetch applications',
    })
  }
})

//send data
app.post('/api/applications', authenticateToken, async (req, res) => {
  try {
    const newApplication = await prisma.application.create({
      data: {
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
        userId: res.locals.userId,
      },
    })

    res.status(201).json(newApplication)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to create application',
    })
  }
})

//delete data
app.delete('/api/applications/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.application.delete({
      where: {
        id: id,
        userId: res.locals.userId,
      },
    })

    res.json({
      message: 'Application deleted',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to delete application',
    })
  }
})

//update data
app.put('/api/applications/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id)

    const updatedApplication = await prisma.application.update({
      where: {
        id: id,
        userId: res.locals.userId,
      },

      data: {
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
      },
    })

    res.json(updatedApplication)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to update application',
    })
  }
})

//for user table
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    })

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to register user',
    })
  }
})

//login api 
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      }
    )

    res.json({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to login',
    })
  }
})

//using jwt
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        message: 'Token required',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: number
      email: string
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.json(user)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to get user',
    })
  }
})

//run port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})