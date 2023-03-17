import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.query.secret !== process.env.SECRET){
        res.status(401).send('Unauthorized');
        return;
    }

    try {
        await res.revalidate('/');
        await res.revalidate('/contact');
        return res.status(200).send({
            message: "Regenerated"
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}