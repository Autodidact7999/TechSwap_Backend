import express from 'express';
import {
  getCommunities,
  getCommunityById,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  getUsersByCommunity,
  addMember,
  removeMember
} from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getCommunities);
router.get('/:id', getCommunityById);
router.post('/', createCommunity);
router.put('/:id', updateCommunity);
router.delete('/:id', deleteCommunity);
router.get('/:id/users', getUsersByCommunity);
router.post('/:id/addMember', addMember); // Add member to a community
router.post('/:id/removeMember', removeMember); // Remove member from a community

export default router;