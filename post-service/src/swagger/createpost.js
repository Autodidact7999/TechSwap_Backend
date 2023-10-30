/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image for the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               user:
 *                 type: string
 *                 description: The user ID who is creating the post
 *               community:
 *                 type: string
 *                 description: The community ID where the post is being created
 *     responses:
 *       '201':
 *         description: Post was successfully created
 *       '400':
 *         description: Bad request
 */