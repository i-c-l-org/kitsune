---
Proveniencia e Autoria: Este documento integra o projeto Prometheus (licenca MIT-0).
Nada aqui implica cessao de direitos morais/autorais.
Conteudos de terceiros nao licenciados de forma compativel nao devem ser incluidos.
Referencias a materiais externos devem ser linkadas e reescritas com palavras proprias.
---

# GitHub Actions & Repository Setup Guide

## Required Manual Configuration

### 1. NPM Token (for publishing packages)

1. Go to https://www.npmjs.com/settings/{your-username}/tokens
2. Create a new automation token
3. Go to your repository settings: https://github.com/{org}/{repo}/settings/secrets/actions
4. Add a new secret:
   - **Name**: `NPM_TOKEN`
   - **Value**: Your npm automation token

### 2. GitHub App (for branch protection workflow)

To enable the branch protection setup workflow, you need a GitHub App:

1. Go to https://github.com/settings/apps/new
2. Create a new GitHub App with:
   - **Name**: Prometheus Branch Protection
   - **Homepage URL**: https://github.com/{org}/{repo}
   - **Webhook**: Disable (uncheck)
   - **Permissions**: Read access to administration, Read access to code, Read/write access to repository administration
3. Create the app and note the **App ID**
4. Generate a private key for the app
5. In your repository settings, add these secrets:
   - **Name**: `APP_ID`
     **Value**: Your App ID
   - **Name**: `APP_PRIVATE_KEY`
     **Value**: The private key you downloaded

### 3. Branch Protection Rules (GUI Alternative)

Instead of using the workflow, you can manually configure in:
https://github.com/{org}/{repo}/settings/branches

1. Click "Add branch protection rule"
2. Enter branch name pattern: `main` (or `dev`)
3. Enable:
   - [OK] Require a pull request before merging
   - [OK] Require approvals (1)
   - [OK] Require code owner reviews
   - [OK] Require status checks to pass before merging
     - CI / Build
     - CI / Lint
     - CI / TypeCheck
     - CI / Test
   - [OK] Require branches to be up to date
   - [OK] Require linear history
   - [OK] Include administrators

### 4. Labels

Run the setup workflow to create all labels:

1. Go to Actions tab
2. Select "Setup Labels" workflow
3. Click "Run workflow"

Or manually create labels in:
https://github.com/{org}/{repo}/labels

### 5. Enable Workflows

After pushing, make sure to enable the workflows in:
https://github.com/{org}/{repo}/actions

## Quick Setup Checklist

- [ ] Add `NPM_TOKEN` secret (for npm publishing)
- [ ] Configure branch protection on `main` and `dev`
- [ ] Run "Setup Labels" workflow
- [ ] Enable all workflows in Actions tab
- [ ] Update CODEOWNERS with actual usernames

## Workflow Triggers

| Workflow     | Trigger               |
| ------------ | --------------------- |
| CI           | Push/PR to dev, main  |
| Release      | New tag v\* or manual |
| Sponsor      | New sponsorship       |
| Stale        | Weekly schedule       |
| Greeting     | New PR/Issue          |
| Labeler      | PR opened/synced      |
| Auto Approve | Dependabot PR         |
| Setup Labels | Manual trigger        |
| Setup Branch | Manual trigger        |
