import Query from '../queryhandler';
import { Request, Response } from 'express';
import { consultConfigs } from '../../Example/Config';

//CONSULTS QUERIES
async function getConsults(req: Request,res: Response) {
    await Query.getTable(req, res,consultConfigs , false);
}
async function getDeletedConsults(req: Request,res: Response) {
    await Query.getTable(req, res, consultConfigs , true);
}
async function postConsults(req: Request, res: Response) {
    await Query.postTable(req, res, consultConfigs)
}
async function updateConsultsByID(req: Request, res: Response) {
    await Query.updateTableByID(req, res, consultConfigs)
}
async function deleteConsultsByID(req: Request, res: Response) {
    await Query.softDeleteByID(req, res, consultConfigs )
}

export default {
    getConsults,
    getDeletedConsults,
    updateConsultsByID,
    deleteConsultsByID,
    postConsults
}