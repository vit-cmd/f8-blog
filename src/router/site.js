import express from 'express';
import {siteController} from '../app/controller/SiteController.js';

const siteRouter = express.Router();

siteRouter.get('/search', siteController.search);
siteRouter.get('/', siteController.index);

export default siteRouter;