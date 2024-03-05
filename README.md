<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>NHMS</h1>
<h3>◦ NHMS: Nutrition and Health Management System</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat-square&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat-square&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat-square&logo=YAML&logoColor=white" alt="YAML" />
<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat-square&logo=Jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=flat-square&logo=MySQL&logoColor=white" alt="MySQL" />
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat-square&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />
<img src="https://img.shields.io/badge/Cypress-17202C.svg?style=flat-square&logo=Cypress&logoColor=white" alt="Cypress" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON" />
</p>
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running nhms](#-running-nhms)
  - [🧪 Tests](#-tests)
- [🛬 Deployed Version](#-deployed-version)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

NHMS is an easy to use web-based application where users are able to simply log in their nutrition choices, liquids, exercise, mood, energy levels, menstrual cycle and other symptoms that relate to chronic conditions.

---

## 📦 Features

- User profiles: Users can create and login to personalised profiles.
- Admin dashboard: Selected administrators can view settings not available to regular users.
- Blog: Explore and view articles on different foods and recipes.

---

## 🚀 Getting Started

**_Dependencies_**

Please ensure you have the following dependencies installed on your system:

`node` - to run any commmands.

`postgres` - to download and use the database provided.

`cypress` - to run tests.

### 🔧 Installation

1. Clone the nhms repository:

```sh
git clone https://github.com/nutrition-monitoring-system/nhms.git
```

2. Change to the source directory:

```sh
cd nhms/src
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running nhms

```sh
npm run dev
```

in development and

```sh
npm run build
npm run start
```

in production.

### 🧪 Tests

```sh
npm run test OR npm run cy:run - # for headless mode
npm run cy:open - # to actively run tests in the Cypress browser.

```

**Make sure that the `dev dependencies` are installed using:**

```sh
npm install -D
```

---

## 🛬 Deployed Version

Users can find the deployed version of nhms on Vercel with [this link](https://nhms-beta.vercel.app/).

- User account: Users can register for an account and then login using the [register](https://nhms-beta.vercel.app/register) page.

- Admin account: The admin account can be accessed [here](https://nhms-beta.vercel.app/admin).

---

## 🛣 Project Roadmap

> - [x] `ℹ️  Create a basic scaffolding for the nutrition management system.`
> - [ ] `ℹ️  Expand out with recommendations for foods, per client.`
> - [ ] `ℹ️  MORE TO BE ADDED.`

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/nutrition-monitoring-system/nhms/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/nutrition-monitoring-system/nhms/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/nutrition-monitoring-system/nhms/issues)**: Submit bugs found or log feature requests for NUTRITION-MONITORING-SYSTEM.

#### _Contributing Guidelines_

<details closed>
<summary>Click to see contribution instructions</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

   ```sh
   git clone <your-forked-repo-url>
   ```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.

   ```sh
   git commit -m 'Implemented new feature x.'
   ```

6. **Push to GitHub**: Push the changes to your forked repository.

   ```sh
   git push origin new-feature-x
   ```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License.

For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 👏 Acknowledgments

- Computing Science Department, University of Aberdeen
- Dr. Monika Gostic
- Dr. Chunyan Mu
- Dr. Bruce Scharlau

---

[**Return**](#Top)

---
