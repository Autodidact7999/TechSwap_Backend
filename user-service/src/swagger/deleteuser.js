/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
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
 *         description: User was successfully deleted
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Something went wrong
 */