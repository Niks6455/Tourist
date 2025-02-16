import { where } from 'sequelize';
import Tour from '../models/tour.js';

export default {
  // Создать тур
  async createTour(req, res) {
    try {
      const { title, description, fullDescription, price, location, dateStart, dateEnd, nights, transfer } = req.body;
      
      if (!title ) {
        return res.status(400).json({ message: 'Title is required' });
      }
      
      if (!description) {
        return res.status(400).json({ message: 'Description is required' });
      }
      
      if (!price) {
        return res.status(400).json({ message: 'Price is required' });
      }
       
      if (!location) {
        return res.status(400).json({ message: 'Location is required' });
      }

      if (!dateStart) {
        return res.status(400).json({ message: 'Date start is required' });
      }
      
      if (!dateEnd) {
        return res.status(400).json({ message: 'Date end is required' });
      }
       
      if (!nights) {
        return res.status(400).json({ message: 'Nights is required' });
      }
      if(!transfer){
        return res.status(400).json({ message: 'Transfer is required' });
      }
      
      const tour = await Tour.create({ title, description, fullDescription, price, location, dateStart, dateEnd, nights, transfer });
      res.status(201).json({ message: 'Tour created successfully', tour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Получить все туры
  async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll({ 
        where: { deleted: false },
        order: [['createdAt', 'DESC']] // Сортировка по убыванию даты создания
      });
      res.status(200).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  // Получить тур по ID
  async getTourById(req, res) {
    try {
      const { id } = req.params;
      const tour = await Tour.findByPk(id);
      
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      
      res.status(200).json(tour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
 
  // Обновить тур
  async updateTour(req, res) {
    try {
      const { id } = req.params;
      const { title, description, price, location, fullDescription, dateStart, dateEnd, nights, transfer } = req.body;
      
      const tour = await Tour.findByPk(id);
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      
      await tour.update({ title, description, price, location, fullDescription, dateStart, dateEnd, nights, transfer });
      res.status(200).json({ message: 'Tour updated successfully', tour });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async deleteTour(req, res) {
    try {
      const { id } = req.params;
      const tour = await Tour.findByPk(id);
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
      
      await tour.update({ deleted: true });
      res.status(200).json({ message: 'Tour marked as deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
