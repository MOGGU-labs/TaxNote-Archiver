import { Router } from 'express';

import * as onTest from '../Example/queriestest'

import onClient from '../models/client_query'
import onCase from '../models/case_query'
import onConsult from '../models/consult_query'

import Special from '../models/special_query'


export const route = Router();
//Test Routes
route.get('/data/status',onTest.checkStatus);
route.post('/data',onTest.PostData);
route.delete('/data',onTest.deleteAll);
route.get('/data',onTest.getAllData);
//by :id
route.get('/data/:id',onTest.getDataById);
route.put('/data/:id',onTest.updateData);
route.delete('/data/:id',onTest.deleteData);

//Clients Routes

route.get('/clients',onClient.getClients);
route.post('/clients',onClient.postClients);
route.put('/clients/:id',onClient.updateClientbyid);
route.delete('/clients/:id',onClient.deleteClientbyid);

//Cases Routes

route.get('/cases',onCase.getCases);
route.put('/cases/:id',onCase.updateCasesbyid);
route.delete('/cases/:id',onCase.deleteCasesbyid);
//Consults Routes 
route.get('/consults/',Special.getConsults);

//Special Routes
route.get('/clients/deleted',Special.getDeletedClients);
route.get('/cases/deleted',Special.getDeletedCases)