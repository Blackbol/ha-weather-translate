# Weather Translate for Home Assistant 🌤️🇫🇷

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/Blackbol/ha-weather-translate?include_prereleases&color=blue)](https://github.com/Blackbol/ha-weather-translate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **Language / Langue :** English | [Français](README.fr.md)

---

A lightweight Home Assistant Lovelace plugin that **automatically translates standard `weather-forecast` cards into French**, even when the host browser, OS, iPad, or wall tablet is locked to English and cannot change system language.

---

## ✨ Features

- 🇫🇷 **Automatic French Translation**: Translates days of the week (*Mon → lun.*, *Tue → mar.*, etc.) and all weather condition states (*Sunny → Ensoleillé*, *Partly cloudy → Partiellement nuageux*, *Rainy → Pluvieux*, *Clear, night → Nuit claire*, etc.).
- 🚀 **Zero Configuration Required**: Once loaded, it automatically detects any `weather-forecast` card on your dashboard.
- 🔄 **Real-Time & Reactive**: Uses deep DOM inspection and `MutationObserver` to instantly translate dynamic weather updates and view switching.
- 📱 **Wall Tablet & iPad Friendly**: Designed specifically for wall-mounted kiosks, iPads, and browsers locked to English.

---

## 📦 Installation

### Method 1: Via HACS (Recommended)

1. Open **HACS** in Home Assistant.
2. Click the **three vertical dots ⋮** in the top-right corner, then click **Custom repositories**.
3. Add this repository:
   - **URL**: `https://github.com/Blackbol/ha-weather-translate`
   - **Type**: `Dashboard` (or `Lovelace`)
4. Click **Add**.
5. Find **Weather Translate (French)** in HACS and click **Download**.
6. Refresh your dashboard (Ctrl + F5 or pull down to refresh on tablets).

---

### Method 2: Manual Installation

1. Download [`weather-translate.js`](weather-translate.js).
2. Copy it into your Home Assistant `/config/www/` directory (e.g. `/config/www/weather-translate.js`).
3. In Home Assistant, navigate to **Settings** → **Dashboards** → **Resources** (top right menu).
4. Click **Add Resource**:
   - **URL**: `/local/weather-translate.js`
   - **Resource type**: `JavaScript module`
5. Refresh your dashboard.

---

## ⚙️ Usage

No special YAML configuration is needed! Just use your standard weather card:

```yaml
type: weather-forecast
entity: weather.forecast_home
forecast_type: daily
show_forecast: true
show_current: true
```

The plugin will automatically detect and translate the card in real-time.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
