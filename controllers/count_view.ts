import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";

const count_view = async (req: Request, res: Response) => {
  const { code } = req.query;

  const codeExist = await prisma.text.findUnique({
    where: {
      sharing_code: code as string,
    },
  });

  !codeExist && res.status(400).json({ message: "Invalid sharing code" });

  await prisma.viewsCount.create({
    data: {
      created: dayjs().toDate(),
      sharing_code: code as string,
    },
  });

  res.status(201).json({ message: "Viewed" });
};

export default count_view;
