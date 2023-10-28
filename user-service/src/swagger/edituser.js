/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Edit a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
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
 *       200:
 *         description: User was successfully updated
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Something went wrong
 */