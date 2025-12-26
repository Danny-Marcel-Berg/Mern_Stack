# Git Branch Commands

Add these concise branch creation and management commands to your workflow.

Create and switch to a new branch:

```powershell
git checkout -b <branch-name>
# or (newer Git)
git switch -c <branch-name>
```

Create a branch without switching:

```powershell
git branch <branch-name>
```

Push a new branch to remote and set upstream:

```powershell
git push -u origin <branch-name>
```

Useful branch management:

```powershell
git branch --all        # list local and remote branches
git branch -d <branch>  # delete local branch (safe)
git branch -D <branch>  # force delete local branch
git push origin --delete <branch>  # delete branch on remote
```

Replace `<branch-name>` with e.g. `feature/login`.
