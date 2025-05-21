import { Router } from 'express';

import * as onTest from '../Example/queriestest'

import onClient from '../models/client_query'
import onCase from '../models/case_query'
import onConsult from '../models/consult_query'


export const route = Router();
//Test Routes
route.get('/data/status',onTest.checkStatus);
route.post('/data',onTest.PostData);
route.delete('/data',onTest.deleteAll);
route.get('/data',onTest.getAllData);

route.get('/data/:id',onTest.getDataById);
route.put('/data/:id',onTest.updateData);
route.delete('/data/:id',onTest.deleteData);

//Clients Routes
route.get('/clients/status',onClient.checkStatus);

//Cases Routes
route.get('/cases/status',onCase.checkStatus);

//Consults Routes 
route.get('/consults/status',onCase.checkStatus);