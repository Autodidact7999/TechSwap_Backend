/**
 * @swagger
 * /communities/{id}:
 *   put:
 *     summary: Update a community
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Community id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *               techStacks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Community was successfully updated
 *       404:
 *         description: Community not found
 *       500:
 *         description: Something went wrong
 */