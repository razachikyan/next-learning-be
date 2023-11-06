import express from "express"
import { Login, Logout, SignIn, getUserById, getUserBySessionId, getUserByUserName } from "../controllers/users"

const route = express.Router()

route.post("/login", Login)
route.post("/signup", SignIn)
route.post("/logout", Logout)
route.get("/user:id", getUserById)
route.get("/user:username", getUserByUserName)
route.get("/user:sessionId", getUserBySessionId)

export default route