



# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /usr/src
COPY . .

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["exec", "@"]
