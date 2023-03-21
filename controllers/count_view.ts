import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";

const count_view = async (req: Request, res: Response) => {
  const { code } = req.query;

  await prisma.viewsCount.create({
    data: {
      created: dayjs().toDate(),
      sharing_code: code as string,
    },
  });
};

export default count_view;
