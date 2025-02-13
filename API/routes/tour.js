import { Router } from 'express';
import tourCtrl from './../controllers/tourController.js';
import { asyncRoute } from '../utils/errors.js';
import verify from '../middlewares/checkToken.js';
const router = Router();

router.route('/').post(asyncRoute(verify.general), tourCtrl.createTour);
router.route('/').delete(asyncRoute(verify.general), tourCtrl.deleteTour);
router.route('/').put(asyncRoute(verify.general), tourCtrl.updateTour);
router.route('/').get(asyncRoute(verify.general), tourCtrl.getAllTours);
router.route('/:id').get(asyncRoute(verify.general), tourCtrl.getTourById);
export default router;