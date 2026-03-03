# Git Notes

> Reference: [git-scm.com/cheat-sheet](https://git-scm.com/cheat-sheet)

---

## 1. Creating a New Branch and Moving to It

```bash
# Create a new branch and switch to it immediately
git switch -c <branch-name>
# OR (older syntax)
git checkout -b <branch-name>

# List all branches (current branch is highlighted)
git branch

# List branches by most recently committed to
git branch --sort=-committerdate

# Switch to an existing branch
git switch <branch-name>
# OR
git checkout <branch-name>

# Delete a branch (safe — only if fully merged)
git branch -d <branch-name>

# Force delete a branch
git branch -D <branch-name>
```

---

## 2. Adding Files, Committing, and Pushing

```bash
# Stage a specific file
git add <file>

# Stage all changes in the current directory
git add .

# Interactively choose which parts of a file to stage
git add -p

# Check what is staged / unstaged
git status

# Commit staged changes with a message
git commit -m 'your message here'

# Stage all tracked changes and commit in one step
git commit -am 'your message here'

# Push the current branch (first time — sets upstream)
git push -u origin <branch-name>

# Push subsequent commits on a tracked branch
git push
```

---

## 3. Regularly Updating Your Branch from Main (Merge)

Keep your feature branch up to date with `main` by merging it in regularly
to minimise large conflicts later.

```bash
# Make sure you have the latest changes from the remote
git fetch origin main

# Switch to your feature branch
git switch <your-branch>

# Merge main into your branch
git merge main
# OR pull + merge in one step
git pull origin main
```

**What merge does:**
- Creates a new "merge commit" that joins the two histories.
- Preserves the full history of both branches.
- Safe to use on shared/public branches.

---

## 4. Rebasing: How It Differs from Merging and When to Use It

### Rebase

```bash
# Switch to your feature branch and rebase onto main
git switch <your-branch>
git rebase main

# Fetch latest changes then rebase your current branch
git pull --rebase
```

**What rebase does:**
- Re-applies your commits on top of the tip of `main`, as if you had
  branched off from there today.
- Results in a **linear history** — no extra merge commits.
- Rewrites commit SHAs (treat rebased commits as new commits).

### Merge vs Rebase — Quick Comparison

| | Merge | Rebase |
|---|---|---|
| History | Preserves full branching history | Linear, cleaner history |
| Extra commits | Adds a merge commit | No extra commits |
| Safe on shared branches | ✅ Yes | ⚠️ Avoid (rewrites history) |
| Great for | Long-lived feature branches, PRs | Keeping local branch up to date |

### When to Use Rebase in Team Development

- **Do rebase:** before opening a pull request, to move your feature branch
  on top of the latest `main` and avoid noise in the PR diff.
- **Do merge:** when integrating a completed feature branch into `main` or
  when collaborating with others on the same branch.
- **Never force-push a rebased branch** to a remote branch that other team
  members are also working from.

---

## 5. Fixing Divergent Branches

A divergent branch occurs when both your local branch and the remote have
new commits that the other does not have (i.e. they have diverged).

### Option A — Rebase (recommended for feature branches)

```bash
git switch <your-branch>
git rebase main
```

This replays your commits on top of `main`, producing a linear history.

### Option B — Merge

```bash
git switch main
git merge <your-branch>
```

This creates a merge commit joining the two diverged histories.

### Option C — Squash Merge (clean merge for PRs)

```bash
git switch main
git merge --squash <your-branch>
git commit
```

Squashes all commits from the feature branch into a single commit on `main`.

### Undoing a Failed Rebase

```bash
# Find the commit you were at before the rebase
git reflog <branch-name>

# Reset back to that commit
git reset --hard <commit>
```

---

## 6. Fixing Common Team Issues

### Merge Conflicts

When Git cannot automatically combine changes:

```bash
# After a conflicting merge or rebase, open the conflicting files,
# resolve the markers (<<<<<<<, =======, >>>>>>>), then:
git add <resolved-file>
git commit           # for merge
# OR
git rebase --continue  # for rebase
```

To abort and start over:

```bash
git merge --abort
git rebase --abort
```

### Accidentally Committed to the Wrong Branch

```bash
# Undo the last commit but keep the changes staged
git reset HEAD^

# Switch to the correct branch and re-commit
git switch <correct-branch>
git commit -m 'your message'
```

### Overwriting Remote Changes Safely

Avoid a plain `--force` push; use `--force-with-lease` instead — it will
fail if someone else has pushed since you last fetched:

```bash
git push --force-with-lease
```

### Stashing Work in Progress

```bash
# Save unfinished changes without committing
git stash

# Bring them back
git stash pop
```

### Undoing the Last Commit (keep changes)

```bash
git reset HEAD^
```

### Amending the Last Commit (message or missed file)

```bash
git add <forgotten-file>   # optional
git commit --amend
```

### Cherry-Picking a Single Commit from Another Branch

```bash
git cherry-pick <commit>
```

---

## Ways to Refer to a Commit

| Reference | Example |
|---|---|
| Branch name | `main` |
| Tag | `v1.0` |
| Commit ID | `3e887ab` |
| Remote branch | `origin/main` |
| Current commit | `HEAD` |
| N commits ago | `HEAD~3` or `HEAD^^^` |
