import User from '../models/user.js';
import Institution from '../models/institution.js';
import TechStack from '../models/techStack.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Add your logic here for registering a user, logging in, and getting user data

export const registerUser = async (req, res) => {
    const { username, email, password, institutionName, techStackNames = [] } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      let institution = await Institution.findOne({ name: institutionName });
      if (!institution) {
        institution = await Institution.create({ name: institutionName });
      }
  
      const techStacks = [];
      for (let i = 0; i < techStackNames.length; i++) {
        let techStack = await TechStack.findOne({ name: techStackNames[i] });
        if (!techStack) {
          techStack = await TechStack.create({ name: techStackNames[i] });
        }
        techStacks.push(techStack._id);
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await User.create({ 
        username, 
        email, 
        password: hashedPassword, 
        institution: institution._id, 
        techStacks 
      });

      

      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      return res.status(201).json({ result, token });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email }).populate('institution techStacks');
      if (!existingUser) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      return res.status(200).json({ result: existingUser, token });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const getUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
  
    if (id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    try {
      const user = await User.findById(id).populate('institution techStacks');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // don't return the password
      user.password = undefined;
  
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const editUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
  
    if (id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    const { username, email, password, institutionName, techStackNames = [] } = req.body;
  
    try {
      let user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let institution = await Institution.findOne({ name: institutionName });
      if (!institution) {
        institution = await Institution.create({ name: institutionName });
      }
  
      const techStacks = [];
      for (let i = 0; i < techStackNames.length; i++) {
        let techStack = await TechStack.findOne({ name: techStackNames[i] });
        if (!techStack) {
          techStack = await TechStack.create({ name: techStackNames[i] });
        }
        techStacks.push(techStack._id);
      }
  
      const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
  
      const updatedUser = await User.findByIdAndUpdate(id, 
        { 
          username, 
          email, 
          password: hashedPassword, 
          institution: institution._id, 
          techStacks 
        }, 
        { new: true }
      ).populate('institution techStacks');
  
      updatedUser.password = undefined;
  
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
  
    if (id !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await User.findByIdAndRemove(id);
  
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  export const getAllUser = async (req, res) => {
    try {
      const users = await User.find().populate('institution techStacks');
  
      // don't return the passwords
      users.forEach(user => {
        user.password = undefined;
      });
  
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };