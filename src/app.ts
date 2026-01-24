import express, { Application } from "express"
import authRouter from './modules/auth/auth.router';
import { authMiddleware } from "./middlewares/auth.middleware";
import { roleMiddleware } from "./middlewares/role.middleware";
import { CoffeeRoutes } from "./modules/coffee/coffee.router";

const app:Application = express();

app.use(express.json());

app.use('/auth', authRouter);

// protected route......
app.get('/admin', authMiddleware, roleMiddleware('ADMIN'), (req,res) => {
  res.send('Welcome Admin');
});

app.use("/api/coffees", CoffeeRoutes);

export default app;