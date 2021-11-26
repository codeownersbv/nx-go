# Nx-Go plugin

Nx-plugin to easily create Golang applications or libraries.

## Table of content

- [Requirements](#requirements)
  - [Development software](#development-software)
- [Getting started](#getting-started)
- [Usage](#usage)
  - [Build](#build)
  - [Lint](#lint)
  - [Serve](#serve)
  - [Test](#test)
- [MIT License](#mit-license)

## Getting started

1. In an Nx workspace install plugin: `npm install -d TEMP`
2. Create a library or application: `nx g TEMP:app example-app`

## Usage

You can now run the Nx workspace commands:

### Build

Build application using the `go build` command. App-build can be found in `dist/<app-name>`.

```bash
nx build example-app
```

### Lint

Lint the application using the `go fmt` command.

```bash
nx lint example-app
```

### Serve

Serves the application using the `go run` command.

```bash
nx serve example-app
```

### Test

Test the application using the `go test` command.

```bash
nx test example-app
```

## MIT License

Created by [Mike Scheurwater](https://github.com/MikeScheurwater) & [CodeOwners](https://github.com/codeowners-company)

Derived from [nx-go](https://github.com/nx-go/nx-go) by [Bram Borggreve](https://github.com/beeman)
