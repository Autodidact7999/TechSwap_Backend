/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:            
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - BearerAuth: []     
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized access
 */