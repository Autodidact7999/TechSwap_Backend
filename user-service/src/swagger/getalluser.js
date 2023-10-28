/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of users. Password field is undefined for security.
 *       500:
 *         description: Server error
 */