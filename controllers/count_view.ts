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

  await prisma.viewsCount.create({
    data: {
      created: dayjs().toDate(),
      sharing_code: code as string,
    },
  });
};

export default count_view;
