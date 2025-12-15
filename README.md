# Infrastructure Repository

This repository manages infrastructure using Pulumi with TypeScript.

## Structure

```
.
├── .github/workflows/    # CI/CD automation
├── stacks/               # Infrastructure stacks
│   ├── abscond.io/       # abscond.io domain infrastructure
│   ├── binari.ly/        # binari.ly domain infrastructure
│   ├── curlto.me/        # curlto.me domain infrastructure
│   ├── callahan.house/   # callahan.house domain infrastructure
│   └── zmc.dev/          # zmc.dev domain infrastructure
```

## Workflow

### Pull Requests

- Creates a Pulumi preview for any changed stacks
- Posts the preview as a comment on the PR
- No changes are applied until merge

### Main Branch

- Automatically applies infrastructure changes for modified stacks
- Uses AWS OIDC for authentication
- Only runs on stacks that have changes since the last commit

## Stack Organization

Each stack manages DNS and related infrastructure for a specific domain:

- Configuration is in `Pulumi.yaml` and `Pulumi.prod.yaml`
- DNS records are organized by type (email, web, etc.)
- Secrets are encrypted using AWS KMS
