import { Request, Response } from 'express';
import { adminConfig } from '../../Example/adminConfig';
import Query from '../queryhandler';

//ADMIN QUERIES

export async function NUKE_IT(req: Request, res: Response) {
    Query.ClearAllTable(req,res,adminConfig )
}
export default {
    NUKE_IT
}
