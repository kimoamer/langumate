# Navbar Language Switcher for Frappe

This is a **custom app** for the [Frappe Framework](https://frappeframework.com) that adds a **language switcher dropdown** to the **navbar**, allowing users to easily change the interface language directly from the top navigation bar.

---

## Features

- 📚 **Dropdown menu in the navbar for language selection.**
- 🌐 **Supports all languages configured in Frappe.**
- 🔄 **Instantly updates user language preference.**
- 🎯 **Lightweight and seamlessly integrates with existing Frappe setups.**

---

## Installation

1. Clone the repository into your Frappe apps directory:

    ```bash
    cd ~/frappe-bench/apps
    git clone https://github.com/kimoamer/langumate.git
    ```

2. Install the app into your site:

    ```bash
    cd ~/frappe-bench
    bench --site your-site-name install-app langumate
    ```

3. Build assets (if required):

    ```bash
    bench build
    ```

4. Restart Frappe:

    ```bash
    bench restart
    ```

---

## Usage

Once installed, the **Langumate** will automatically appear in the **top-right navbar**, next to the user profile or help menu (depending on your Frappe version and configuration).

- Clicking the dropdown will display a list of **available languages**.
- Selecting a language will **instantly reload** the page and apply the new language for the logged-in user.

---

## Configuration

- The available languages are controlled via **Frappe's Language settings**.
- You can also customize the appearance or behavior by overriding the **langumate.bundle.js** or **languages.py** hooks if necessary.

---

## Screenshots

| Example Dropdown |
|---|
| ![Dropdown Example](https://i.postimg.cc/ncfgq0Bv/2025-03-05-22-28-54.png) |
| ![Navbar Settings](https://i.postimg.cc/yNxb75Cz/navbar.png)

---

## Compatibility

- ✔️ **Frappe v15+** (Tested on versions 15)

---

## Development

To make changes or contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](license.txt) file for details.

---

## Author

Developed by [Innomate](https://github.com/InnomateLtd)  
For support or inquiries, feel free to reach out via GitHub issues.
