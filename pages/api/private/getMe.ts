// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "src/utils/constants";

type Data = {
  email: string;
  fullName: string;
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accessToken = req.cookies[ACCESS_TOKEN];
  const { accesstoken } = res.getHeaders();
  const { data } = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken ?? accesstoken}`,
    },
  });

  res.status(200).json(data.data);
}
