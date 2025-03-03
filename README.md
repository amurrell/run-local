# run-local (rl)

A more custom way to do local development, where a bash script saves you/your team from long READMEs and context switching. Friendly prompts and shortcuts to get anyone up to speed quickly.

> [!TIP]
> Ideal for laravel, wordpress, or nodejs projects, where you have a database dump, image assets, or env variables. Really ideal if you have a lot of these projects and want consistency and ease to switch between them, onboard new team members, or just make your life easier.

Used with [DockerLocal](https://github.com/amurrell/DockerLocal) for Docker container creation.

### Usage

```bash
❯ ./run-local

=== 🧃 Welcome to the run-local script!

 Usage:
  ./run-local <command> [options]

 Examples:
   ./run-local up
   ./run-local down
   ./run-local install
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
Commands & Interactive Prompt: RL-Extended (Custom) Commands:

  e1) list               · List all available rl sites in RL_DEV_FOLDER
  e2) post-install       · Run post-install commands
  e3) artisan            · Run an Artisan command
  e4) debug-artisan      · Run an Artisan command with Xdebug enabled
  e5) tinker             · Run the Tinker REPL
  e6) debug-tinker       · Run the Tinker REPL with Xdebug enabled

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
- **Assets & Data Prep:** You have access to `env` variables, database dump mariadb/mysql (sql), image assets (archive), and are running PHP or NodeJS projects.

### Steps

To **add run-local as your local development tool**, follow these steps as a 1-time process per project.

1. `cd YOURPROJECT` - Navigate to your project directory.
1. Use wget or curl to copy run-local, rl-vars, rl-alias

   ```bash
   # wget
   wget https://raw.githubusercontent.com/amurrell/run-local/main/run-local && chmod +x run-local
   wget https://raw.githubusercontent.com/amurrell/run-local/main/rl-vars && chmod +x rl-vars
   wget https://raw.githubusercontent.com/amurrell/run-local/main/rl-alias && chmod +x rl-alias
   ```

   <details>
      <summary>See: Curl</summary>

   ```bash
   # curl
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/run-local && chmod +x run-local
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/rl-vars && chmod +x rl-vars
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/rl-alias && chmod +x rl-alias
   ```

   </details>

   ***

1. Populate **rl-vars** with your project details

   <details>
      <summary>See: rl-vars snippet</summary>

   ```bash
   PROJECT_NAME="🐣 YOUR PROJECT"

   # Relevant Use Case: create_default_file function
   DEFAULT_PORT="3000"
   DEFAULT_DB_NAME="myprojectdb"
   DEFAULT_WEB_SERVER_ROOT="/var/www/site/html"
   DEFAULT_PHP_VERSION="8.2"
   DEFAULT_UBUNTU_RELEASE_NAME="jammy"
   DEFAULT_UBUNTU_VERSION="22.04"
   DEFAULT_YAML_VERSION="2.2.3"
   DEFAULT_NVM_VERSION="18.17.1"
   DEFAULT_DB_IMAGE="mariadb:10.6" # can choose mysql or mariadb
   # ... more
   ```

   </details>

   ***

1. Copy [README-TEMPLATE](./README-TEMPLATE.md) or relevant parts to your Project's README. This is how others will **setup their local development** with run-local once it's committed to your project, with your own `rl-vars`, `rl-extended`, and `rl-funcs`.

1. Consider adding `rl-extended` and `rl-funcs` functions for your project, changing however you need, adding only relevant ones, your making your own, based on these.

   ```bash
   # rl-extended
   wget https://raw.githubusercontent.com/amurrell/run-local/main/rl-extended && chmod +x rl-extended
   # composer
   mkdir -p rl-funcs && cd rl-funcs
   wget https://raw.githubusercontent.com/amurrell/run-local/main/rl-funcs/rl-composer && chmod +x rl-composer
   # artisan (Laravel)
   wget https://raw.githubusercontent.com/amurrell/run-local/main/rl-funcs/rl-artisan && chmod +x rl-artisan
   ```

   <details>
      <summary>See: Curl</summary>

   ```bash
   # rl-extended
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/rl-extended && chmod +x rl-extended
   # composer
   mkdir -p rl-funcs && cd rl-funcs
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/rl-funcs/rl-composer && chmod +x rl-composer
   # artisan (Laravel)
   curl -O https://raw.githubusercontent.com/amurrell/run-local/main/rl-funcs/rl-artisan && chmod +x rl-artisan
   ```

   </details>

   ***

1. Run `./run-local install` and follow the prompts, using your copy of the `README-TEMPLATE` as a guide (and make notes in it as you go). If your project is not yet a git repo, it will ask you to `git init`. If you do not have `DockerLocal`, it will be pulled in as a submodule for you.

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
