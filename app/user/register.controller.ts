import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

const createNewUser = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = parseInt(process.env.SALT_PASS || "10");
    const hashedPw = await bcrypt.hash(password, salt);

    if (name !== undefined && email !== undefined && password !== undefined) {
      const createdUser = await createNewUser({
        name,
        email,
        password: hashedPw,
      });
      return res.json({
        meta: {
          success: true,
          message: "success",
          devMessage: createdUser,
        },
      });
    } else {
      return res.json({
        meta: {
          success: false,
          message: "fields-required",
          devMessage: "",
        },
      });
    }
  } catch (err) {
    return res.json({
      meta: {
        success: false,
        message: "internal-server-error",
        devMessage: err,
      },
    });
  }
};

// // utilities
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GAMIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// // controllers
// const createNewUser = async (data: Prisma.UserCreateInput) => {
//   return prisma.user.create({
//     data,
//   });
// };

// interface IMailInvite {
//   to: string;
//   token: string;
// }

// const userMailInvite = async ({ to, token }: IMailInvite) => {
//   return transporter.sendMail({
//     from: "support@sai.com",
//     to: to,
//     subject: "Mantine Test Invitation",
//     html: template(token, to),
//   });
// };
