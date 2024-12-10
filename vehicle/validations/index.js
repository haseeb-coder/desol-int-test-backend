import * as yup from 'yup';

const vehicleSchema = yup.object().shape({
  userId: yup.string().required('User ID is required'),
  carModel: yup.string().min(3, 'Car model must be at least 3 characters').required('Car model is required'),
  price: yup.number().positive('Price must be a positive number').required('Price is required'),
  phone: yup
    .string()
    .matches(/^01[0-9]{9}$/, 'Phone number must be valid (e.g., 01123456789)')
    .required('Phone number is required'),
  city: yup.string().required('City is required'),
  numberOfCopies: yup
    .number()
    .min(1, 'Number of copies must be at least 1')
    .max(10, 'Number of copies must be at most 10')
    .required('Number of copies is required'),
});

export const validateVehicleInfo = async (data) => {
  return vehicleSchema.validate(data, { abortEarly: false });
};
