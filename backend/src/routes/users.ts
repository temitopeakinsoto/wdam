import { Router, Request, Response } from "express";

import { getUsers, getUsersCount, getUsersWithAddresses, getUserById } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 100;
  const includeAddresses = req.query.includeAddresses === 'true';
  
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  try {
    let users;
    if (includeAddresses) {
      users = await getUsersWithAddresses(pageNumber, pageSize);
    } else {
      users = await getUsers(pageNumber, pageSize);
    }
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Error fetching users" });
  }
});

router.get("/with-addresses", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 100;
  
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  try {
    const users = await getUsersWithAddresses(pageNumber, pageSize);
    res.send(users);
  } catch (error) {
    console.error("Error fetching users with addresses:", error);
    res.status(500).send({ message: "Error fetching users with addresses" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  
  if (!userId) {
    res.status(400).send({ message: "User ID is required" });
    return;
  }

  try {
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Error fetching user" });
  }
});



export default router;
