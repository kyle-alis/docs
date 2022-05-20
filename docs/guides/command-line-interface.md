---
title: Command Line Interface
sidebarDepth: 2
prev: /guides/set-up-your-favourite-IDE
next: /guides/make-your-first-request
---

# Command Line Interface

The **alis.exchange** command-line interface (CLI) is a powerful tool for managing resources on **alis.exchange**.  You can use this tool to perform many common platform tasks either from the command line or in scripts and other automations. Some example use cases for the CLI:

- List organisations and/or products;
- Clone a product to your local environment;
- Create a new product / organisation;
- Deploy new versions of your product; and
- Manage the build and deploy steps of your services.

## Install Prerequisites

Before you install the **alis.exchange** CLI, install the following prerequisites:

### Google Cloud SDK

The CLI makes use of Google Cloud SDK authentication to seamlessly authenticate your requests to **alis.exchange**.  

1. Install the latest version of Cloud SDK for your device by following the [instructions](https://cloud.google.com/sdk/docs/install).
2. Run `gcloud auth login` from your terminal to authenticate your local environment with Google user account via a web-based authorization flow.
    *NOTE* Ensure that you login using your account associated with alis.exchange.
3. Run `gcloud auth application-default login` to acquire new user credentials to use for Application Default Credentials ([ADC](https://developers.google.com/identity/protocols/application-default-credentials)). These are used in calling Google APIs.

           
### Git

Git may already be installed on your device. Check by running `git --version`. A successful response should look similar to `git version 2.30.0`. If the command was not found, follow the [installation instructions](https://www.atlassian.com/git/tutorials/install-git).

### Connect Git with Google Cloud

Your Git needs to be configured with Google Cloud Source repositories. Credential helper scripts provide the information that Git needs to connect securely to Cloud Source Repositories using your Google Account credentials.

1. Access [this link](https://source.developers.google.com/auth/start?scopes=https://www.googleapis.com/auth/cloud-platform&state=) and log in with your Google credentials
2. Copy the relevant script into your terminal

☑️ Check if this was successful by opening the `.gitcookies` file in Vim: `vim ~/.gitcookies`. If successful, the file should contain a `source.developers.google.com` entry.

## Install the CLI

1. Run the following command to create a folder in your home directory **alis.exchange** with a sub-folder cli.

```bash
    mkdir -p ~/alis.exchange/cli
```

2. Add this folder to your `$PATH`:

```bash
  export PATH=$PATH:~/alis.exchange/cli
```

3. Download the latest version of the CLI for your operating system (OS) and architecture (ARCH). 
    
    > Not sure what your OS or ARCH is, run `uname -a` to find out.
    
   ### List of available CLI binaries
   
   MacOS:
    - [Darwin Amd64](https://files.cli.alis.services/darwin/amd64/latest/alis)
    - [Darwin Arm64](https://files.cli.alis.services/darwin/arm64/latest/alis)
    
   Windows:
    - [Windows Amd64](https://files.cli.alis.services/windows/amd64/latest/alis)
    - [Windows Arm](https://files.cli.alis.services/windows/arm/latest/alis)
    - [Windows Arm64](https://files.cli.alis.services/windows/arm64/latest/alis)

    Linux:
    - [Linux Amd64](https://files.cli.alis.services/linux/arm64/latest/alis)
    - [Linux Arm](https://files.cli.alis.services/linux/arm64/latest/alis)
    - [Linux Arm64](https://files.cli.alis.services/linux/arm64/latest/alis)
   

4. Place the file in your alis.exchange/cli folder. Run the following command to give it execute permission:

```bash
    chmod a+x $HOME/alis.exchange/cli/alis
```

5. Close and restart all currently open terminal windows, including IDEs, such that the configurations of the paths can take place.

   > For MacOs, open the CLI by right clicking on the file and open. This will prompt you 'The application is from an unidentified developer. Are you sure you want to open it?'. Select open. This will allow MacOs permission to always run the CLI and therefore you only have to do it with your initial installation.

You have successfully installed the **alis.exchange** CLI!

### Try out alis_ CLI

```bash
# Show help 
alis -h

# list available organisations
alis org list

# Setup your local environment for organisation 'play'
alis org get play

# list available products
alis product list play
```
