/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               institutionName:
 *                 type: string
 *               techStackNames:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: User already exists
 *       500:
 *         description: Something went wrong
 */