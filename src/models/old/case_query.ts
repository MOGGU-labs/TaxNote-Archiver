import { Request, Response } from 'express';
import Query from '../queryhandler';
import { caseConfigs } from '../../Example/Config';

//CASES QUERIES
async function getCases(req: Request, res: Response) {
    await Query.getTable(req, res, caseConfigs, false)
}
async function getDeletedCases(req: Request, res: Response) {
    await Query.getTable(req, res, caseConfigs, true)
}
async function postCases(req: Request, res: Response) {
    await Query.postTable(req, res, caseConfigs)
}
async function updateCasesByID(req: Request, res: Response) {
    await Query.updateTableByID(req, res, caseConfigs)
}
async function deleteCasesByID(req: Request, res: Response) {
    await Query.softDeleteByID(req, res, caseConfigs)
}

export default {
    getCases,
    postCases,
    updateCasesByID,
    deleteCasesByID,
    getDeletedCases
}
