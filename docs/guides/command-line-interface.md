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


### Go

Install any one of the **three latest major** [releases of Go](https://golang.org/doc/devel/release.html).  For installation instructions, see Go’s [Getting Started](https://golang.org/doc/install) guide.

☑️ After installation, running `go version` should reflect one of the three latest major Go versions.

### Protocol Buffer compiler

1. Install the **[Protocol buffer](https://developers.google.com/protocol-buffers) compiler**, `protoc`, [version 3](https://developers.google.com/protocol-buffers/docs/proto3). For installation instructions, see [Protocol Buffer Compiler Installation](https://grpc.io/docs/protoc-installation/).  This tool significantly simplifies working with our Protocol Buffers.

2. Install the required **Go plugins** for the protocol compiler:

    1. Install the protocol compiler plugins for Go using the following commands:

            go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
            go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

    2. Update your `PATH` so that the `protoc` compiler can find the plugins:

           export PATH="$PATH:$(go env GOPATH)/bin"
           
### Git

Git may already be installed on your device. Check by running `git --version`. A successful response should look similar to `git version 2.30.0`. If the command was not found, follow the [installation instructions](https://www.atlassian.com/git/tutorials/install-git).

### Connect Git with Google Cloud

Your Git needs to be configured with Google Cloud Source repositories. Credential helper scripts provide the information that Git needs to connect securely to Cloud Source Repositories using your Google Account credentials.

1. Access [this link](https://source.developers.google.com/auth/start?scopes=https://www.googleapis.com/auth/cloud-platform&state=) and log in with your Google credentials
2. Copy the relevant script into your terminal

☑️ Check if this was successful by opening the `.gitcookies` file in Vim: `vim ~/.gitcookies`. If successful, the file should contain a `source.developers.google.com` entry.

## Install the CLI

1. Install the CLI. This will place the CLI binary in your `$GOPATH/bin` folder.

```
go install github.com/alis-x/cli/alis@latest
```
2. Ensure that `$GOPATH/bin` has been added to your `$PATH` such that your terminal can access the `alis` CLI. The following command appends the path to the `.zshrc` file.

```
echo 'export PATH="$PATH:$(go env GOPATH)/bin"' >> ~/.zshrc
```

3. Close and restart all currently open terminal windows, including IDEs, such that the configurations of the paths can take place.

### Try it out

```bash
# Show help 
alis -h

# list available organisations
alis org list

# Setup your local environment for organisation 'foo'
alis org get foo

# list available products
alis product list foo
```
