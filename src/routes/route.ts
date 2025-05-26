//import * as onTest from '../Example/queriestest'


import { Router } from 'express';
export const route = Router();

/*
//Test Routes
route.get('/data/status',onTest.checkStatus);
route.post('/data',onTest.PostData);
route.delete('/data',onTest.deleteAll);
route.get('/data',onTest.getAllData);
//by :id
route.get('/data/:id',onTest.getDataById);
route.put('/data/:id',onTest.updateData);
route.delete('/data/:id',onTest.deleteData);
*/
//Basic--QueryModules
import onClient from '../models/old/client_query'
import onCase from '../models/old/case_query'
import onConsult from '../models/old/consult_query'
//Admin--QueryModules
import onAdmin from '../models/old/admin';
import {checkStatus} from '../models/queryhandler'


//========================= Clients Routes =========================//
route.get('/clients',onClient.getClients);
route.post('/clients',onClient.postClients);
//by :id
route.put('/clients/:id',onClient.updateClientByID);
route.delete('/clients/:id',onClient.deleteClientByID);
//extra
route.get('/clients/deleted',onClient.getdeletedClients);

//========================= Cases Routes =========================//
route.get('/cases',onCase.getCases);
route.post('/cases',onCase.postCases);
//by :id
route.put('/cases/:id',onCase.updateCasesByID);
route.delete('/cases/:id',onCase.deleteCasesByID);
//extra
route.get('/cases/deleted',onCase.getDeletedCases);

//========================= Consults Routes =========================//
route.get('/consults',onConsult.getConsults);
route.post('/consults',onConsult.postConsults);
//by :id
route.put('/consults/:id',onConsult.updateConsultsByID);
route.delete('/consults/:id',onConsult.deleteConsultsByID);
//extra
route.get('/consults/deleted',onConsult.getDeletedConsults);

////=========================Special Routes=========================//
route.get('/status',checkStatus);
route.delete('/nuke',onAdmin.NUKE_IT); 


