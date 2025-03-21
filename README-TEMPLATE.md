# [Your Project]

This repository is:

- A website or API most likely: [yourproject.com](https://yourproject.com)
- It is using [DockerLocal](https://github.com/amurrell/DockerLocal) for local containerization
- It is using [run-local](https://github.com/amurrell/run-local) for enjoyable local development

## Local Development Install

### Requirements

- Docker Desktop ([install docs](https://docs.docker.com/desktop/))
- If using [ProxyLocal](https://github.com/amurrell/ProxyLocal), add to `sites.yml`: `<PORT>: docker.yourproject.com`
- **nvm** - Node Version Manager
- You have access to `env` variables for the project (eg. check password manager)
- You have an `sql` dump of the database you want to use (check file storage)

### Steps

1. Clone this repository, ideally at same level as `ProxyLocal` (if using ProxyLocal)

   ```bash
   git clone git@github.com/PROJECTOWNER/YOURPROJECT.git
   ```

1. `cd YOURPROJECT`
1. `./run-local.sh install` & follow prompts!
1. Visit http://localhost:PORT and/or http://docker.yourproject.com
1. Open a new terminal window and run `rl` to test alias works.

---

### rl alias

The `rl` alias is a shortcut to run the `run-local.sh` script. You can run it from **anywhere** and it will prompt for which run-local project you want to run when you have multiple projects in a code directory (defined by `RL_DEV_FOLDER` in your shell profile).

**Usage**

```bash
# from anywhere
❯ rl up
Available run-local scripts:
1) ~/code/<specific-project>
2) ~/code/<specific-project>
3) ~/code/sub-projects/<specific-project>
Select a run-local script to execute:
```

<details>
   <summary>See: Manual Setup</summary>

If you already have an **rl-alias**, you can skip this step.

```bash
❯ alias rl
rl=rl
```

If you do not have it in your shell profile (eg. `~/.zshrc`), you can add it manually.

**Update Values** for `DEV_FOLDER` (above your project) and `SHELL_PROFILE`, **Change Directory** to project root, where `rl-alias` is located, and then paste in your terminal all at once:

```bash
# Update these values
DEV_FOLDER=${HOME}/code
SHELL_PROFILE=${HOME}/.zshrc

ln -s rl-alias "$DEV_FOLDER/rl-alias"
echo "# Run Local Alias" >> "$SHELL_PROFILE"
echo "RL_DEV_FOLDER=${DEV_FOLDER}" >> "$SHELL_PROFILE"
echo "source $DEV_FOLDER/rl-alias" >> "$SHELL_PROFILE"
source "$SHELL_PROFILE"
```

</details>

---

### rl cd

When using the `rl` alias outside of your run-local repos, you can quickly jump to a path in a specific project with `rl cd path/in/project`. Answer the prompt to select the project you want to change to.

**Note:** This is only available when using `rl` alias.

**Usage**

```bash
# from anywhere - I know I want to go to my wordpress theme for my angelamurrell project
❯ rl cd html/wp-content/themes/mywebsite
Available run-local scripts: in /Users/angela/code

1) angelamurrell
2) verticolabs
3) run-local

Select a run-local script to execute: 1

=== Changing to /Users/angela/code/angelamurrell:

wp-content/themes/mywebsite on  dev [!?] is 📦 v1.0.0 via  v16.14.2 via 🐘
❯
```
