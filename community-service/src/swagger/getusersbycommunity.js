/**
 * @swagger
 * /communities/{id}/users:
 *   get:
 *     summary: Fetch users of a community by community id
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
 *         description: Users of the community were successfully fetched
 *       404:
 *         description: Community not found
 *       500:
 *         description: Something went wrong
 */