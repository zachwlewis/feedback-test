import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    inputs?: { userName: string; secretCode: string; valid: string };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }
    const b = req.body;
    const userName = b.un || "";
    const secretCode = b.sc || "";
    const valid = b.valid || "";
    const inputs = { userName: userName, secretCode: secretCode, valid: valid };

    await new Promise((resolve) => setTimeout(resolve, 2500));

    if (userName === "") {
        res.status(400).json({ message: "Invalid User Name.", inputs: inputs });
        return;
    }

    if (secretCode === "") {
        res.status(400).json({
            message: "Invalid Secret Code.",
            inputs: inputs,
        });
        return;
    }

    if (valid === "") {
        res.status(400).json({ message: "Invalid Mode.", inputs: inputs });
        return;
    }

    res.status(200).json({ message: "Success", inputs: inputs });
}
