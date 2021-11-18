FROM ligulfzhou53/knight-site-base

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY .eslintrc.json components hooks next-env.d.ts next.config.js package.json pages postcss.config.js public styles tailwind.config.js tsconfig.json utils yarn.lock .
COPY --chown=nextjs:nodejs ./.next ./.next

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
