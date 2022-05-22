import { rest } from 'msw';

export const handlers = [
  rest.post('/register', (req, res, ctx) => {
    sessionStorage.setItem('user', 'true');

    return res(
      ctx.status(200),
      ctx.json({
        message: 'User has been registered',
      })
    );
  }),

  rest.post('/login', (req, res, ctx) => {
    const isUserCreated = sessionStorage.getItem('user');

    if (!isUserCreated) return res(ctx.status(404), ctx.json({ message: 'User not found' }));

    sessionStorage.setItem('is-authenticated', 'true');

    return res(ctx.status(200));
  }),
];
