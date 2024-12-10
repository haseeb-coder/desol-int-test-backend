import Vehicle from '../schema/index.js';
import { validateVehicleInfo } from '../validations/index.js';

class VehicleController {
  static async submitVehicleInfo(req, res) {
    try {
      const { carModel, price, phone, numberOfCopies, userId, city } = req.body;

      await validateVehicleInfo(req.body);

      const imageUrls = req.files.map((file) => file.location);

      const newVehicle = new Vehicle({
        userId,
        carModel,
        city,
        price,
        phone,
        numberOfCopies,
        imageUrls,
      });

      await newVehicle.save();

      res.status(200).json({
        message: 'Vehicle information submitted successfully',
        vehicle: newVehicle,
      });
    } catch (error) {
      console.error('Error submitting vehicle information:', error);
      res.status(400).json({
        message: 'Failed to submit vehicle information',
        error: error.message,
      });
    }
  }
}

export default VehicleController;
