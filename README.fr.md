# Weather Translate pour Home Assistant 🌤️🇫🇷

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![GitHub release](https://img.shields.io/github/v/release/Blackbol/ha-weather-translate?include_prereleases&color=blue)](https://github.com/Blackbol/ha-weather-translate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **Langue / Language :** [English](README.md) | Français

---

Un plugin Lovelace ultra-léger pour **Home Assistant** qui **traduit automatiquement les cartes météo standard `weather-forecast` en français**, même lorsque le navigateur, l'iPad ou la tablette murale est verrouillé en anglais sans possibilité de modifier la langue système.

---

## ✨ Fonctionnalités

- 🇫🇷 **Traduction française automatique** : Traduit les abréviations des jours (*Mon → lun.*, *Tue → mar.*, etc.) et tous les états météo (*Sunny → Ensoleillé*, *Partly cloudy → Partiellement nuageux*, *Rainy → Pluvieux*, *Clear, night → Nuit claire*, etc.).
- 🚀 **Zéro configuration** : Une fois chargé, le plugin détecte automatiquement toutes les cartes météo présentes sur le tableau de bord.
- 🔄 **Temps réel & Réactif** : Utilise l'inspection du DOM profond et des `MutationObserver` pour traduire instantanément lors du rechargement des prévisions ou du changement de vue.
- 📱 **Idéal pour tablettes murales & iPads** : Conçu spécifiquement pour les tablettes murales sous Fully Kiosk ou Safari où le navigateur reste bloqué en anglais.

---

## 📦 Installation

### Méthode 1 : Via HACS (Recommandé)

1. Ouvrez **HACS** dans Home Assistant.
2. Cliquez sur les **trois petits points verticaux ⋮** en haut à droite, puis sur **Dépôts personnalisés** (*Custom repositories*).
3. Ajoutez l'URL du dépôt :
   - **URL** : `https://github.com/Blackbol/ha-weather-translate`
   - **Type** : `Tableau de bord` (ou `Lovelace`)
4. Cliquez sur **Ajouter**.
5. Cherchez **Weather Translate (French)** dans HACS et cliquez sur **Télécharger**.
6. Rafraîchissez votre tableau de bord (Ctrl + F5 ou glisser vers le bas sur tablette).

---

### Méthode 2 : Installation manuelle

1. Téléchargez le fichier [`weather-translate.js`](weather-translate.js).
2. Copiez-le dans le dossier `/config/www/` de votre Home Assistant (ex : `/config/www/weather-translate.js`).
3. Dans Home Assistant, allez dans **Paramètres** → **Tableaux de bord** → **Ressources** (menu en haut à droite).
4. Cliquez sur **Ajouter une ressource** :
   - **URL** : `/local/weather-translate.js`
   - **Type de ressource** : `Module JavaScript`
5. Rafraîchissez votre tableau de bord.

---

## ⚙️ Utilisation

Aucune configuration YAML spécifique n'est requise ! Utilisez simplement la carte météo standard :

```yaml
type: weather-forecast
entity: weather.forecast_maison
forecast_type: daily
show_forecast: true
show_current: true
```

Le plugin détectera et traduira la carte automatiquement.

---

## 📄 Licence

Ce projet est sous licence MIT — voir le fichier [LICENSE](LICENSE) pour plus de détails.
