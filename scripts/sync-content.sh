#!/bin/sh
# Copy the book's markdown from the source repository into this site.
#
# The site vendors the prose rather than building from a checkout of the book,
# so that `pnpm dev` and `pnpm build` work standalone. The cost is that the copy
# goes stale: run this after the book changes, then commit the result.
#
# Usage:
#   ./scripts/sync-content.sh [path-to-health-economics-guide]
#
# The default path assumes the two repositories are siblings:
#   health-economics-guide/
#   ├── health-economics-guide/            <- the book
#   └── health-economics-guide.github.io/  <- this site

set -eu

here=$(cd "$(dirname "$0")/.." && pwd)
source_repo=${1:-"$here/../health-economics-guide"}

if [ ! -d "$source_repo/chapters" ]; then
    echo "No chapters/ directory under $source_repo" >&2
    echo "Pass the path to the book repository as the first argument." >&2
    exit 1
fi

destination="$here/src/content"

# Remove first so a chapter deleted upstream is deleted here too, rather than
# lingering as an orphaned page that the sidebar still links to.
rm -rf "$destination/chapters"
mkdir -p "$destination/chapters"

cp "$source_repo"/chapters/*.md "$destination/chapters/"
cp "$source_repo/GLOSSARY.md" "$destination/GLOSSARY.md"
cp "$source_repo/INDEX.md" "$destination/INDEX.md"

count=$(find "$destination/chapters" -name '*.md' | wc -l | tr -d ' ')
echo "Synced $count chapters, the glossary, and the index from $source_repo"
echo "Review with: git -C \"$here\" status"
