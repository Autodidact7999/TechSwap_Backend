/**
 * @swagger
 * /communities/{id}:
 *   delete:
 *     summary: Delete a community
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Community id
 *     responses:
 *       200:
 *         description: Community was successfully deleted
 *       404:
 *         description: Community not found
 *       500:
 *         description: Something went wrong
 */