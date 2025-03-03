# run-local (rl)

A more custom way to do local development, where a bash script saves you/your team from long READMEs and context switching. Friendly prompts and shortcuts to get anyone up to speed quickly.

Used with [DockerLocal](https://github.com/amurrell/DockerLocal) for Docker container creation.

### Usage

```bash
❯ ./run-local

=== 🧃 Welcome to the run-local script!

 Usage: ./run-local <command> [options]
 Examples:
   ./run-local up
   ./run-local down
   ./run-local install
   ./run-local post-install
   ./run-local npm run hot
   ./run-local ssh
   ./run-local logs
   ./run-local db
   ./run-local db-query "show tables;"
```

<details>
   <summary>See Interactive Prompt & Full List</summary>

```bash
❯ ./run-local
# ... same as above, then:
Available commands & Interactive Prompt:

🧐 Is this your first run? Run 10 to install!

1) up               · Start the site
2) down             · Stop the site
3) ssh              · Access site containers default to web
3a) ssh-mysql           · Access MySQL container
3b) ssh-mysqlroot       · Access MySQL container as root
3c) ssh-web             · Access web container
3d) ssh-webroot         · Access web container as webroot user
4) logs             · View site logs all logs
4a) logs-php            · View PHP logs
4b) logs-access         · View Access (nginx) logs
4c) logs-error          · View Error (nginx) logs
4d) logs-xdebug         · View Xdebug logs
5) db               · Interact with the site database this lists dbs (via ssh-mysql)
5a) db-query            · Query the database; use single quotes for values
5b) db-import           · Import an sql file into the database
5c) db-export           · Export the database with a timestamped filename
5d) db-remove           · Remove the database and start fresh
5e) db-list             · List databases - this is same as running: db
9) npm              · Run npm command; uses nvm install & use first
10) install         · First-time setup (with optional database import)
11) dl              · Runs gitsubmodule update (pulls DockerLocal at ref)
11a) dl-main            · Checkout DockerLocal on main (to update it)
12) help            · Show this help menu

Running Project: 🐣 YOUR PROJECT
Running on Port: 3000
Using Database: myprojectdb

Enter the number (and letter if applicable) of the command you'd like to execute (enter to quit):
```

</details>

### Requirements

- Docker Desktop ([install docs](https://docs.docker.com/desktop/))
- [DockerLocal](https://github.com/amurrell/DockerLocal) is a submodule in this repo at the root.
- **nvm** - Node Version Manager

### Steps

1. `cd YOURPROJECT` - Navigate to your project directory.
1. Use wget or curl to copy run-local, rl-vars, rl-alias

   ```bash
   # wget
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/run-local && chmod +x run-local
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-vars && chmod +x rl-vars
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-alias && chmod +x rl-alias
   ```

   <details>
      <summary>See: Curl</summary>

   ```bash
   # curl
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/run-local && chmod +x run-local
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-vars && chmod +x rl-vars
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-alias && chmod +x rl-alias
   ```

   </details>

   ***

1. Populate **rl-vars** with your project details
1. Copy [README-TEMPLATE](./README-TEMPLATE.md) or relevant parts to your Project's README.
1. Consider adding `rl-extended` and `rl-funcs` functions for your project, changing however you need.

   ```bash
   # rl-extended
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-extended && chmod +x rl-extended
   # composer
   mkdir -p rl-funcs && cd rl-funcs
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-funcs/rl-composer && chmod +x rl-composer
   # artisan (Laravel)
   wget https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-funcs/rl-artisan && chmod +x rl-artisan
   ```

   <details>
      <summary>See: Curl</summary>

   ```bash
   # rl-extended
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-extended && chmod +x rl-extended
   # composer
   mkdir -p rl-funcs && cd rl-funcs
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-funcs/rl-composer && chmod +x rl-composer
   # artisan (Laravel)
   curl -O https://raw.githubusercontent.com/amurrell/RunLocal/main/rl-funcs/rl-artisan && chmod +x rl-artisan
   ```

   </details>

---

### rl alias

The `rl` alias is a shortcut to run the `run-local` script. You can run it from **ANYWHERE** and it will prompt for which run-local project you want to run if not already in same directory.

`./run-local` will install the alias for you (after DockerLocal is pulled) if you have `~/.bashrc` or `~/.zshrc` files if you have them (touch `~/.bashrc` or `~/.zshrc` if you don't).

**Usage**

```bash
# from anywhere, looks in RL_DEV_FOLDER path defined in alias - see rl-alias
❯ rl up
Available run-local scripts:
1) ~/code/<specific-project>
2) ~/code/<specific-project>
3) ~/code/sub-projects/<specific-project>
Select a run-local script to execute:
```

**Manual Installation**

Do this one time to install the alias, no matter how many run-local projects you have.

```bash
# Create a symlink to the rl-alias script in your code folder
DEV_FOLDER=${HOME}/code
ln -s /path/to/rl-alias "$DEV_FOLDER/rl-alias"

# Add the alias to your .bashrc or .zshrc
SHELL_PROFILE=${HOME}/.bashrc
echo ""
echo "# Run-Local Alias" >> $SHELL_PROFILE
echo "RL_DEV_FOLDER=${DEV_FOLDER}" >> $SHELL_PROFILE
echo "source $DEV_FOLDER/rl-alias" >> $SHELL_PROFILE
```
