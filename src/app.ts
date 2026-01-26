import express, { Application } from "express"
import authRouter from './modules/auth/auth.router';
import { authMiddleware } from "./middlewares/auth.middleware";
import { roleMiddleware } from "./middlewares/role.middleware";
import { CoffeeRoutes } from "./modules/coffee/coffee.router";
import { ReviewRoutes } from "./modules/review/review.router";
import { OrderRoutes } from "./modules/order/order.router";

const app:Application = express();

app.use(express.json());

app.use('/auth', authRouter);

// protected route......
app.get('/admin', authMiddleware, roleMiddleware('ADMIN'), (req,res) => {
  res.send('Welcome Admin');
});

app.use("/api/coffees", CoffeeRoutes);

app.use("/api", ReviewRoutes);

app.use("/api",OrderRoutes);

export default app;