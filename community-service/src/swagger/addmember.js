/**
 * @swagger
 * /communities/{id}/addMember:
 *   post:
 *     summary: Add a member to a community
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The community ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User was successfully added to the community
 *       400:
 *         description: Community ID and User ID are required
 *       404:
 *         description: Community not found
 *       500:
 *         description: Something went wrong
 */