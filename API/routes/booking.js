import { Router } from 'express';
import bookingCtrl from './../controllers/bookingController.js';
import { asyncRoute } from '../utils/errors.js';
import verify from '../middlewares/checkToken.js';
const router = Router();

router.route('/').post(asyncRoute(verify.general), bookingCtrl.createBooking);
router.route('/').delete(asyncRoute(verify.general), bookingCtrl.deleteBooking);
router.route('/').get(asyncRoute(verify.general), bookingCtrl.getBookings);
router.route('/').put(asyncRoute(verify.general), bookingCtrl.updateBookingStatus);
export default router;