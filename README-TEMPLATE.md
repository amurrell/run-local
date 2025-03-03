# RunLocal [Your Project]

This repository is:

- Website for [yourproject.com](https://yourproject.com).

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
   git clone git@github.com/YOU/YOURPROJECT.git
   ```

1. `cd YOURPROJECT`
1. `./run-local.sh install` & follow prompts!
1. Visit http://localhost:PORT and/or http://docker.yourproject.com
1. Add [`rl` alias](#rl-alias) to `.zshrc` (not tested for bash)

---

### rl alias

The `rl` alias is a shortcut to run the `run-local.sh` script. It's a good idea to add this to your `.zshrc` file. You can run it from **ANYWHERE** (above & adjacent) and it will prompt for which run-local project you want to run.

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

**Setup**

If you already have an **rl-alias**, you can skip this step.

```bash
❯ alias rl
rl=rl
```

You can use the `rl-alias` that came with your project or from the **run-local** repo, if you have it.

```bash
ln -s rl-alias "${HOME}/code/rl-alias"
echo '# Run Local Alias' >> ~/.zshrc
echo 'RL_DEV_FOLDER="${HOME}/code"' >> ~/.zshrc
echo 'source "${RL_DEV_FOLDER}/rl-alias"' >> ~/.zshrc
source ~/.zshrc
```
