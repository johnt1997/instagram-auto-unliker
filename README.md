# 🚀 Instagram Auto Unlike

Automatisches Entfernen von Instagram "Gefällt mir"-Angaben mit Tampermonkey.

## ⚠️ Disclaimer

Dieses Tool verstößt **technisch** gegen Instagram's Nutzungsbedingungen (Automation). Benutzung auf **eigene Gefahr**. Im schlimmsten Fall kann Instagram deinen Account temporär sperren (24-48h).

## ✨ Features

- ✅ Automatisches Unlike von Instagram-Posts
- ✅ Sicherer Modus mit langen Delays (Ban-sicher)
- ✅ Statistiken in der Console
- ✅ ESC-Taste zum Stoppen
- ✅ Läuft komplett im Browser (keine Server)

## 📋 Installation

### Schritt 1: Tampermonkey installieren

**Chrome:**
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo

**Firefox:**
https://addons.mozilla.org/de/firefox/addon/tampermonkey/

### Schritt 2: Script installieren

**EINFACH:**
1. Klicke hier: [instagram-unlike.user.js](https://raw.githubusercontent.com/johnt1997/instagram-auto-unlike/main/instagram-unlike.user.js)
2. Tampermonkey öffnet sich automatisch
3. Klicke "Installieren"

**ODER MANUELL:**
1. Klicke auf das Tampermonkey-Icon → "Dashboard"
2. Klicke "+" (Neues Script)
3. Lösche alles
4. Kopiere den Code von `instagram-unlike.user.js`
5. STRG+S zum Speichern

### Schritt 3: Benutzen

1. Gehe zu: https://www.instagram.com/your_activity/interactions/likes/
2. Das Script startet **automatisch**!
3. Öffne Console (F12) um Fortschritt zu sehen
4. Drücke **ESC** zum Stoppen

## ⚙️ Einstellungen

In Zeile 9-12 kannst du anpassen:
```javascript
const BATCH_SIZE     = 15;      // Posts pro Durchgang (15-25 empfohlen)
const CLICK_DELAY_MS = 150;     // Millisekunden zwischen Klicks
const AFTER_BATCH_MS = 180000;  // Pause zwischen Batches (3 Min)
```

### Sicherheits-Profile:

**ULTRA SAFE** (kein Ban-Risiko):
```javascript
const BATCH_SIZE     = 10;
const AFTER_BATCH_MS = 300000;  // 5 Minuten
```

**BALANCED** (Standard):
```javascript
const BATCH_SIZE     = 15;
const AFTER_BATCH_MS = 180000;  // 3 Minuten
```

**TURBO** (höheres Risiko):
```javascript
const BATCH_SIZE     = 25;
const AFTER_BATCH_MS = 120000;  // 2 Minuten
```

## 🛡️ Ban-Vermeidung

- ❌ **NICHT** 24/7 laufen lassen
- ✅ Maximal 2-3 Stunden pro Tag
- ✅ Über Nacht laufen lassen ist OK
- ✅ Bei Error 429 → 24h Pause
- ✅ Nicht täglich benutzen (2-3x pro Woche)

## 📊 Statistiken

In der Console (F12) siehst du:
- Anzahl verarbeiteter Batches
- Gesamt entfernte Likes
- Nächster Batch-Zeitpunkt

## ❓ FAQ

**Q: Ist das legal?**  
A: Technisch verstößt es gegen Instagram's ToS, aber du löschst nur deine eigenen Daten. Kein rechtliches Risiko.

**Q: Kann ich gebannt werden?**  
A: Maximal 24-48h temporäre Sperre. Kein permanenter Ban bekannt.

**Q: Funktioniert das auf dem Handy?**  
A: Nein, nur Desktop-Browser (Chrome/Firefox).

**Q: Wie lange dauert es 5000 Likes zu löschen?**  
A: Mit sicheren Einstellungen: ~8-10 Stunden.

**Q: Kann ich nebenbei arbeiten?**  
A: Ja! Tab einfach im Hintergrund lassen.

## 🐛 Troubleshooting

**Script läuft nicht:**
- Prüfe: Ist Tampermonkey aktiviert? (Icon grün)
- Prüfe: Bist du auf der richtigen URL?
- F12 → Console → Siehst du grüne Meldungen?

**"Keine Circles gefunden":**
- Warte 10 Sekunden
- Reload die Seite
- Prüfe ob du überhaupt Likes hast

**Error 429:**
- Instagram hat dich erkannt
- 24h Pause machen
- Danach langsamere Einstellungen benutzen

## 📝 Changelog

### v1.0.0 (2025-02-15)
- Initial release
- Safe mode mit 3-Minuten-Delays
- Automatischer "Auswählen"-Button-Click
- Batch-Processing

## 🤝 Contributing

Pull Requests sind willkommen! Für größere Änderungen bitte erst ein Issue öffnen.

## 📜 License

MIT License - siehe [LICENSE](LICENSE) Datei

## ⚠️ Legal

Dieses Tool ist nur für **Bildungszwecke**. Der Autor übernimmt keine Haftung für gebannte Accounts oder andere Konsequenzen.

---

**Made with ❤️ by [JT1997]**

