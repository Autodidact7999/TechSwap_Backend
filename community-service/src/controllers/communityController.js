import Community from '../models/community.js';
import axios from 'axios';

export const createCommunity = async (req, res) => {
    try {
      console.log("Running createCommunity");
      const community = new Community(req.body);
      const result = await community.save();
      res.status(201).json(result);
    } catch (error) {
      console.log("Error in createCommunity", error.toString());
      res.status(500).json({ error: error.toString() });
    }
  };
  
  export const getCommunities = async (req, res) => {
    try {
      console.log("Running getCommunities");
      const communities = await Community.find({});
  
      const { data: allUsers } = await axios.get(`http://localhost:3000/users`);
  
      const communitiesWithMembers = communities.map(community => {
        const members = community.members.map(memberId => {
          const user = allUsers.find(user => user._id.toString() === memberId.toString());
          if (!user) {
            console.log(`User with ID ${memberId} not found among all users`);
          }
          return user;
        }).filter(Boolean); // Filter out undefined values
  
        return { ...community.toObject(), members };
      });
  
      res.status(200).json(communitiesWithMembers);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
  
  export const getCommunityById = async (req, res) => {
    try {
      console.log("Running getCommunityById");
      const community = await Community.findById(req.params.id);
  
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      const { data: allUsers } = await axios.get(`http://localhost:3000/users`);
  
      const members = community.members.map(memberId => {
        const user = allUsers.find(user => user._id.toString() === memberId.toString());
        if (!user) {
          console.log(`User with ID ${memberId} not found among all users`);
        }
        return user;
      }).filter(Boolean); // Filter out undefined values
  
      const communityWithMembers = { ...community.toObject(), members };
  
      res.status(200).json(communityWithMembers);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };




export const updateCommunity = async (req, res) => {
  try {
    console.log("Running updateCommunity");
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    console.log("Running deleteCommunity");
    const community = await Community.findByIdAndRemove(req.params.id);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    res.status(200).json({ message: 'Community deleted' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export const getUsersByCommunity = async (req, res) => {
    try {
      console.log("Running getUsersByCommunity");
      const community = await Community.findById(req.params.id).populate('members');
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
      res.status(200).json(community.members);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
  

  export const addMember = async (req, res) => {
    const communityId = req.params.id; // Get communityId from route parameters
    const { userId } = req.body;
  
    if (!communityId || !userId) {
      return res.status(400).json({ error: 'Community ID and User ID are required' });
    }
  
    try {
      const community = await Community.findById(communityId);
  
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      if (!community.members.includes(userId)) {
        community.members.push(userId);
        await community.save();
      }
  
      res.status(200).json({ message: 'User added to the community successfully' });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };

  export const removeMember = async (req, res) => {
    const communityId = req.params.id; // Get communityId from route parameters
    const { userId } = req.body;
  
    if (!communityId || !userId) {
      return res.status(400).json({ error: 'Community ID and User ID are required' });
    }
  
    try {
      const community = await Community.findById(communityId);
  
      if (!community) {
        return res.status(404).json({ error: 'Community not found' });
      }
  
      community.members = community.members.filter(memberId => memberId.toString() !== userId);
      await community.save();
  
      res.status(200).json({ message: 'User removed from the community successfully' });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };