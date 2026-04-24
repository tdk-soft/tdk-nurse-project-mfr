# --- STAGE 1: Dependencies ---
# Using Node 22 Alpine for optimized footprint and compatibility with latest engines
FROM node:22-alpine AS deps
# libc6-compat is required for certain node modules (like sharp or canvas) on Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles to leverage Docker layer caching
COPY package.json package-lock.json ./
# npm ci ensures a clean, reproducible install based on the lockfile
RUN npm ci

# --- STAGE 2: Builder ---
FROM node:22-alpine AS builder
WORKDIR /app
# Bring in dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the source code
COPY . .

# Disable Next.js telemetry during the build phase
ENV NEXT_TELEMETRY_DISABLED=1
# Execute production build
RUN npm run build

# --- STAGE 3: Runner ---
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment to production and disable telemetry
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-privileged system user for security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure public directory exists to avoid copy failures if empty
RUN mkdir -p public

# Copy essential assets and the standalone build output
# Standalone mode reduces image size significantly by only including required files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user for runtime execution
USER nextjs

# Standard Next.js port
EXPOSE 3000
ENV PORT=3000

# server.js is the entry point created by Next.js in standalone output mode
CMD ["node", "server.js"]