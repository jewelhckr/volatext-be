import dayjs from "dayjs";
import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import cryptr from "../utils/cryptr";

export default async function get(req: Request, res: Response) {
  const code: string = req.params.code as string;
  const accessToken: string = req.query.accessToken as string;
  const text = await prisma.text.findUnique({
    where: {
      sharing_code: code,
    },
  });

  if (!text) {
    return res.status(404).json({ message: "Text not found" });
  }

  const now = dayjs();
  const expiry = dayjs(text.expiry);

  const diff = expiry.diff(now, "m");

  if (diff < 1) {
    await prisma.text.delete({
      where: { sharing_code: code },
    });
    return res.status(404).json({ message: "Text not found" });
  }

  const viewsCount = async () => {
    return await prisma.viewsCount.count({
      where: {
        sharing_code: code,
      },
    });
  };

  const isOwner = async () => {
    return text.accessToken === accessToken;
  };

  if (await isOwner()) {
    return res.status(200).json({
      text: cryptr.decrypt(text.text),
      sharing_code: text.sharing_code,
      diff,
      isProtected: false,
      viewsCount: text.viewsCount,
      views: await viewsCount(),
      isOwner: true,
    });
  }

  if (text.isProtected) {
    return res.status(200).json({
      text: text.text.replaceAll("a", "@"),
      sharing_code: text.sharing_code,
      diff,
      isProtected: text.isProtected,
      viewsCount: text.viewsCount,
    });
  }

  if (text.selfDestruct) {
    await prisma.text.delete({
      where: { sharing_code: code },
    });
  }

  return res.status(200).json({
    text: cryptr.decrypt(text.text),
    sharing_code: text.sharing_code,
    diff,
    isProtected: text.isProtected,
    viewsCount: text.viewsCount,
  });
}
