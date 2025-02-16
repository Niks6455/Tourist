import Review from "../models/reviews.js";
import User from "../models/user.js";
export default {

   async getReviews(req, res) {
      try {
         const reviews = await Review.findAll({
            include: { model: User, attributes: ['id', 'fio', 'email'] },
         });
   
         res.json(reviews);
      } catch (e) {
         res.status(500).json(e);
      }
   },
   

   async createReview(req, res) {
       const userId = req.user.id;
      try {
         const review = await Review.create({ review: req.body.review, userId: userId, rating: req.body.rating, tourId: req.body.tourId });
         res.json(review); 
      } catch (e) {
         res.status(500).json(e);
      }
   },

   async getReview(req, res) {
      try {
         const review = await Review.findAll({
            where: { tourId: req.params.id },
            include: { model: User, attributes: ['id', 'fio', 'email'] },
         });
         res.json(review);
      } catch (e) {
         res.status(500).json(e);
      }
   },

}
