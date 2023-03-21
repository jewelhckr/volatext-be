import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";

const count_view = async (req: Request, res: Response) => {
  prisma.viewsCount.create({
    data: {
      created: dayjs().toDate(),
      sharing_code: req.query.code as string,
    },
  });
};

export default count_view;
