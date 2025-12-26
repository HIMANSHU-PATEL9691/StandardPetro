import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(services);
};

export const createService = async (req, res) => {
  const { title, short_description, full_description, icon, order, features } = req.body;
  
  const service = await Service.create({
    title,
    short_description,
    full_description,
    icon,
    order,
    features: features ? JSON.parse(features) : [],
    image: req.file ? `/uploads/services/${req.file.filename}` : "",
  });

  res.status(201).json(service);
};

export const updateService = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });

  Object.assign(service, req.body);
  if (req.body.features) service.features = JSON.parse(req.body.features);
  if (req.file) service.image = `/uploads/services/${req.file.filename}`;

  await service.save();
  res.json(service);
};

export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};