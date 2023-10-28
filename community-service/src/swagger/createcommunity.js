/**
 * @swagger
 * /communities/create:
 *   post:
 *     summary: Create a new community
 *     tags: [Communities]
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
 *               creator:
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
 *       201:
 *         description: Community was successfully created
 *       500:
 *         description: Something went wrong
 */