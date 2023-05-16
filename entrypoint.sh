#!/bin/sh

echo "Check that we have NEXT_PUBLIC_CRM_API_DOMAIN vars"
test -n "$NEXT_PUBLIC_DEPLOY_MODE"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_DEPLOY_MODE#$NEXT_PUBLIC_DEPLOY_MODE#g"

echo "Starting Nextjs"
exec "$@"