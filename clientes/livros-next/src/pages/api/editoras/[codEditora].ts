import ControleEditora from "../../../../classes/controle/ControleEditora";
import { NextApiRequest, NextApiResponse } from "next";

const controleEditora = new ControleEditora();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const codEditora = Number(req.query.codEditora);
      const nomeEditora = await controleEditora.getNomeEditora(codEditora);
      res.status(200).json(nomeEditora);
    } else {
      res.status(405).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
