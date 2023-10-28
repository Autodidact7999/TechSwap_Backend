/**
 * @swagger
 * /communities/{id}:
 *   get:
 *     summary: Fetch a community by id
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
 *         description: Community was successfully fetched
 *       404:
 *         description: Community not found
 *       500:
 *         description: Something went wrong
 */