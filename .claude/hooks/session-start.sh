#!/bin/bash
# SessionStart hook: install RTK (Rust Token Killer) and register its Claude Code hook.
#
# RTK is a CLI proxy that filters verbose bash output (git, npm, tsc, eslint, ...)
# before it reaches the context window, cutting 60-90% of the tokens those
# commands would otherwise cost. See https://github.com/rtk-ai/rtk
#
# Remote containers are ephemeral, so the binary has to be reinstalled per
# session. This script is idempotent and cheap when the install is already cached.
set -euo pipefail

# Only run in Claude Code on the web / remote containers. Local machines are
# expected to install RTK once, by hand.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Pinned so the install is reproducible and does not depend on the GitHub API's
# "latest release" lookup, which is rate-limited behind the container proxy.
RTK_VERSION="${RTK_VERSION:-v0.45.0}"
RTK_INSTALL_DIR="${RTK_INSTALL_DIR:-$HOME/.local/bin}"

export PATH="$RTK_INSTALL_DIR:$PATH"

installed_version() {
  command -v rtk >/dev/null 2>&1 || return 1
  rtk --version 2>/dev/null | awk '{print "v"$2}'
}

if [ "$(installed_version || true)" = "$RTK_VERSION" ]; then
  echo "rtk $RTK_VERSION already installed at $(command -v rtk)"
else
  echo "Installing rtk $RTK_VERSION..."
  # The installer verifies the release tarball against the published SHA-256
  # checksums and rejects archives containing path-traversal entries.
  curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh \
    | RTK_VERSION="$RTK_VERSION" RTK_INSTALL_DIR="$RTK_INSTALL_DIR" sh
fi

# Register the PreToolUse hook in ~/.claude/settings.json plus the RTK.md
# reference in ~/.claude/CLAUDE.md. Written globally rather than into this
# repo's .claude/settings.json on purpose: the hook command is only ever
# installed after the binary is confirmed present, so a failed download can
# never leave every Bash call trying to shell out to a missing `rtk`.
rtk init -g --auto-patch

# Keep rtk on PATH for the rest of the session (tool calls, not just this hook).
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$RTK_INSTALL_DIR:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi
