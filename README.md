# run-local (rl)

A more custom way to do local development or generate docker build files, where a bash script saves you/your team from long READMEs and context switching. Friendly prompts and shortcuts to get anyone up to speed quickly.

> [!TIP]
> Ideal for laravel, wordpress, or nodejs projects, where you have a database dump, image assets, or env variables. Really ideal if you have a lot of these projects and want consistency and ease to switch between them, generate docker build files, onboard new team members, or just make your life easier.

By default this project is using frankenPHP (& caddy) docker images, PHP 8.4 (at time of writing), Node 22.15.0 and MariaDB 11.4, but you can change all settings and all template files to suit your needs using `rl-config` folder to override defaults.

### Usage

```bash
❯ rl

=== 🧃 Welcome to the run-local script!

 Usage:
  rl <command> [options]

 Examples:
   rl up
   rl down
   rl install
   rl npm run hot
   rl ssh
   rl logs
   rl db
   rl db-query "show tables;"
```

<details>
   <summary>See Interactive Prompt & Full List</summary>

```bash
❯ rl
# ... same as above, then:
 Commands:
  1) up                · Start the site containers (in background)
  1a) up-foreground       · Start the site containers (in foreground)
  1b) up-proxy            · Start the site containers (in background) with rl-proxy
  2) build             · Build the site containers & compile config
  2a) build-proxy         · Build the rl-proxy containers
  3) down              · Stop the site containers
  3a) down-proxy          · Stop the rl-proxy containers
  4) ssh               · Access site containers (default: web)
  4a) ssh-mysql           · Access MySQL container
  4b) ssh-mysqlroot       · Access MySQL as root
  4c) ssh-web             · Access web container
  4d) ssh-webroot         · Access web as webroot user
  4e) ssh-proxy           · Access rl-proxy container
  5) logs              · View all logs
  5a) logs-php            · View PHP logs
  5b) logs-access         · View nginx access logs
  5c) logs-error          · View nginx error logs
  5d) logs-xdebug         · View Xdebug logs
  6) db                · Interact with the database
  6a) db-create           · Create a new database
  6b) db-query            · Query the database
  6c) db-import           · Import an SQL file
  6d) db-export           · Export the database
  6e) db-remove           · Drop and recreate the database
  6f) db-list             · List databases
  7) npm               · Run an npm command
  8) install           · First-time setup - 🧐 Is this your first run? Start here!
  9) help              · Show this help menu
  10) list             · List run-local scripts
  11) cd               · cd to your project folder


Commands & Interactive Prompt: RL-Extended (Custom) Commands:

RL-Extended (Custom) Commands:

  e1) post-install    · Run post-install commands
  e2) composer        · Run a Composer command
  e3) artisan         · Run an Artisan command
  e4) debug-artisan   · Run an Artisan command with Xdebug enabled (port 9002)
  e5) tinker          · Run Tinker (Laravel REPL)
  e6) debug-tinker    · Run Tinker with Xdebug enabled (port 9002)
  e7) assets-download . Download assets folder via ssh into tar.gz in rl/docker/data
  e8) assets          . Checks rl/docker/data for .tar.gz files, swaps/backs up current uploads


 Running Project: 🐣 YOUR PROJECT
 Running on Port: 3000
 Using Database: project_db

Enter option by # or command to execute (enter to quit):
```

</details>

## Install

Requires:

- Docker Desktop ([install docs](https://docs.docker.com/desktop/))
- **nvm** - Node Version Manager
- **Assets & Data Prep:** You have access to `env` variables, database dump mariadb/mysql (sql), image assets (archive), and are running PHP or NodeJS projects.

First time setup:

```
# via curl
cd your-project-folder
curl -O https://raw.githubusercontent.com/amurrell/run-local/main/lib/rl-installer
bash rl-installer

# via wget
cd your-project-folder
wget https://raw.githubusercontent.com/amurrell/run-local/main/lib/rl-installer
bash rl-installer
```

See the `run-local/lib/README-TEMPLATE.md` for a readme based on a configured run-local project.

## How it works?

The first time you setup a project with run-local it helps you setup your project with a few prompts and stores them in `rl-vars`. It will create a `rl-config` folder in the root of your project, which contains the configuration files for your project (like the `rl-vars`).

### RL-Config Folder

This folder is used to store the configuration for your project, including the database name, port, and other settings. It can then be version controlled, making it easy to share with your team. Others then do not need to think about the setup and can start using the run-local scripts right away to get up and running.

The `rl-config` folder contains the following folders and files:

- `rl-vars` (file): This file is used to store the configuration for your project, including the database name, port, and other settings.
- `rl-extended-options` (file): This file is used to store the extended funcs menu options for your project - eg. laravel, nodejs or wordpress specific commands, or other custom commands you want to run.
- `docker` (folder): This folder contains the Dockerfiles and other configuration files for your project. Its path mirrors the run-local submodule, so you can easily find the files you need or want to override from the original run-local project. Examples are `computed`, `args`, `conf`, and `templates` folders.
- `funcs` (folder): This folder contains the custom extended functions for your project (seen in `./run-local` Extended commands). It works in tandem with the `rl-extended-options` file to create a custom menu for your project. You can add your own functions here, or modify the existing ones to suit your needs. If you put this folder here, it will override the default run-local submodule `lib/funcs` folder. The advantage is you can version control it and share all your custom scripts with your team, yet have them available for execution in the run-local script.

### Docker & Proxy

If your project has a `rl-config` folder, you can easily get started by just running `rl up` or `rl up-foreground` to start the containers. If your project is using a domain other than `localhost` then you use `rl up-proxy` to start the containers with the proxy. This will automatically set up the proxy for you, so you can access your project at `https://yourproject.com` or `http://yourproject.com`.

### rl alias

The `rl` alias is a shortcut to run the `run-local` script. You can run it from **anywhere** and it will prompt for which run-local project you want to run when you have multiple projects in a code directory (defined by `RL_DEV_FOLDER` in your shell profile). Running `run-local` shoulld install the alias for you, so test it out!

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
2) another-project
3) run-local

Select a run-local script to execute: 1

=== Changing to /Users/angela/code/angelamurrell:

wp-content/themes/mywebsite on  dev [!?] is 📦 v1.0.0 via  v16.14.2 via 🐘
❯
```
