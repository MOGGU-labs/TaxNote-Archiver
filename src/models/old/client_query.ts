import { Request, Response } from 'express';
import Query from '../queryhandler';
import { clientConfigs } from '../../Example/Config';

//CLIENTS QUERIES
async function getClients(req: Request,res: Response) {
    await Query.getTable(req, res,clientConfigs , false);
}
async function getdeletedClients(req: Request,res: Response) {
    await Query.getTable(req, res, clientConfigs , true);
}
async function postClients(req: Request, res: Response) {
    await Query.postTable(req, res, clientConfigs)
}
async function updateClientByID(req: Request, res: Response) {
    await Query.updateTableByID(req, res, clientConfigs)
}
async function deleteClientByID(req: Request, res: Response) {
    await Query.softDeleteByID(req, res, clientConfigs )
}

export default {
    getClients,
    getdeletedClients,
    postClients,
    updateClientByID,
    deleteClientByID
}


