
import Booking from '../models/booking.js';
import User from '../models/user.js';
import Tour from '../models/tour.js';

export default {
  async createBooking(req, res) {
    try {
      const { tourId, comment, countPeople } = req.body;
      const userId = req.user.id;

      if (!userId || !tourId || !comment || !countPeople) {
        return res.status(400).json({ message: 'User ID and Tour ID are required' });
      }
      
      const booking = await Booking.create({ userId, tourId,  status: 'pending', comment, countPeople });
      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async updateBookingStatus(req, res) {
    try {
      const { bookingId, status } = req.body;
      const allowedStatuses = ['pending', 'confirmed', 'canceled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      booking.status = status;
      await booking.save();
      res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getBookings(req, res) {
    try {
      const userData = req.user;
      let bookings;
      
      if (userData.role === 'manager') {
        bookings = await Booking.findAll({ include: [User, Tour] });
      } else {
        bookings = await Booking.findAll({ where: { userId: userData.id }, include: [Tour] });
      }
      
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      await booking.destroy();
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
