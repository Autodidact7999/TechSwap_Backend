import * as communityController from '../../src/controllers/communityController.js';
import Community from '../../src/models/community.js';
import axios from 'axios';

jest.mock('./../src/models/community'); // Mock the Community model
jest.mock('axios'); // Mock the axios module

describe('communityController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all instances and calls to constructor and all methods
  });

  describe('createCommunity', () => {
    it('should create a new community', async () => {
      const req = { body: { name: 'test community' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const saveSpy = jest.spyOn(Community.prototype, 'save');
      saveSpy.mockResolvedValue(req.body);

      await communityController.createCommunity(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should handle errors in createCommunity', async () => {
      const req = { body: { name: 'test community' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error('Test error');
      const saveSpy = jest.spyOn(Community.prototype, 'save');
      saveSpy.mockRejectedValue(mockError);

      await communityController.createCommunity(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.toString() });
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  // Add similar tests for getCommunities, getCommunityById, updateCommunity, deleteCommunity, getUsersByCommunity, addMember, removeMember
  // The structure will be the same, you'll just need to adjust the mocked inputs and outputs and the assertions
});