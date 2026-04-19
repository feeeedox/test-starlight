---
title: Zwei-Faktor-Authentifizierung
description: Hier findest du alle Infos bzgl. der Zwei-Faktor-Authentifizierung.
---

Die Zwei-Faktor-Authentifizierung unterstützt euch bei der Sicherheit eures Accounts – niemand möchte, dass Dritte 
den eigenen Account missbrauchen, sobald sie durch Phishing, Hacking o.ä. Zugriff auf euren Account erlangt haben.

## Warum 2FA für *dich* sinnvoll ist
Immer wieder hören wir im [Hilfechannel](/general/faq/#wer-supportet-mich-wenn-ich-fragen-habe), dass ein Minecraft Account gehackt wurde und jetzt von Fremden dazu genutzt 
wird, auf öffentlichen Servern zu cheaten. Natürlich kann (und sollte!) man **Sicherheitsmaßnahmen** ergreifen, wie zum 
Beispiel das [Passwort regelmäßig zu ändern](https://www.minecraft.net/de-de/profile) und auf Mojang 
[Sicherheitsfragen anzugeben](https://account.mojang.com/me/settings), allerdings gibt es inzwischen nicht ohne Grund 
in vielen Teilen des Internets die Möglichkeit, eine weitere Sicherheitsmaßnahme zu ergreifen:
Die **Zwei-Faktor-Authentifizierung**.

Egal ob Twitter, Discord oder Steam, überall ist es möglich, die zweistufige Authentifizierung einzurichten.
Kurz und knapp formuliert **bedeutet 2FA für dich, dass ein Hacker deinen Account nicht auf Timolia nutzen kann, 
selbst wenn er Zugriff auf dein Passwort hat**.

## Wie funktioniert das System?
Du **verknüpfst** ganz einfach deinen **Minecraft Account** auf Timolia mit einer **2FA App** auf deinem Handy.
Sobald das geschehen ist, fragt dich Timolia nach dem ständig wechselnden Code, der dir auf deinem Handy angezeigt wird, um zu bestätigen, dass du wirklich du bist.
Aber keine Angst: Du musst nicht ständig dein Handy griffbereit haben, weil du mal eben das Spiel neugestartet hast. 
Du musst dich nur neu verifizieren, wenn du länger als **24 Stunden** nicht online warst oder sich deine **IP geändert** hat!
Zusätzlich hast du die Möglichkeit, mit `/2fa logout` eine erneute Identifikation zu erzwingen, solltest du deinen PC verlassen 
und anderen anwesenden Personen nicht vertrauen kannst.

## Was muss ich beachten?
Nach der Einrichtung der Zwei-Faktor-Authentifizierung werden dir Backup-Codes angezeigt. **Notiere dir diese an einem sicheren Ort**!
Solltest du den Zugriff auf dein Handy durch Verlust, Diebstahl o.ä. verlieren, **verlierst du ohne diese Codes den Zugriff auf 
diesen Minecraft Account auf Timolia**.
Wir können in diesem Fall die Zwei-Faktor-Authentifizierung für dich **nicht** deaktivieren!

## Einrichtung von 2FA
- Lies dir [Was muss ich beachten?](#was-muss-ich-beachten) sorgfältig durch und stelle sicher, dass du den Absatz verstanden hast. 
  Solltest du Fragen haben, melde dich im [Support](/faq/#wer-supportet-mich-wenn-ich-fragen-habe)!
- **Installiere** dir auf deinem Handy eine **Authenticator App**. Wir empfehlen dir für 
  Android **Aegis** ([Android](https://play.google.com/store/apps/details?id=com.beemdevelopment.aegis)). Alternativ kannst du den 
  **Google Authenticator** ([Andorid](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) / [iOS](https://itunes.apple.com/de/app/google-authenticator/id388497605)) nutzen. 
  Du findest die Apps auch wie gewohnt über die Suche im App Store bzw. Play Store. Natürlich kannst du auch eine andere Authentifizierungsapp nutzen.
- Nutze `/2fa setup`, um dir den QR-Code sowie das Secret anzeigen zu lassen, mit dem du deinen Account verknüpfen kannst.
  Gib beide Daten niemals an Dritte weiter und **stelle sicher, dass diese niemand einsehen kann**, weder zum Zeitpunkt der
  Einrichtung noch zu einem beliebigen Zeitpunkt danach!
  <br/>
  ![2FA Setup](../../../assets/images/2fa-setup.png)
- Öffne jetzt deine Authentifizierungsapp und klicke auf das Symbol zum Hinzufügen eines neuen Accounts. 
  Je nachdem, ob dein Handy über eine funktionierende Außenkamera verfügt oder nicht, kannst du jetzt ganz einfach den
  **QR-Code** auf deinem Bildschirm abscannen oder das **Secret** darunter in dein Handy tippen.
- Wenn die **Verknüpfung** erfolgreich war, solltest du auf deinem Handy jetzt einen sechsstelligen **Code angezeigt** bekommen, der für 30 Sekunden 
  gültig ist und anschließend neu generiert wird. 
  Tippe den Code jetzt in dein Minecraft Chatfenster ein und bestätige so die Verknüpfung.
  Keine Angst, die Nachricht wird nicht in den öffentlichen Chat geschrieben.
- Fertig! Du kannst jetzt ganz normal weiterspielen. Dein Account, deine Stats und deine Ränge sind sicher.
  <br/>
  ![2FA Authentifizierung](../../../assets/images/2fa-authentication.png)
- **Achtung!** Bitte notiere dir die **Backup-Codes** (einsehbar unter `/2fa buc`)! Diese Codes musst du nutzen, solltest 
  du einmal dein Handy verlieren oder aus anderen Gründen nicht mehr auf deine App zugreifen können.
  **Ohne Backup-Codes kannst du nicht mehr auf deinen Account zugreifen!**
  <br/>
  ![2FA Backup-Codes](../../../assets/images/2fa-backupcodes.png)

## Was du sonst noch tun kannst
Stelle sicher, dass du für deinen Minecraft Account, deinen E-Mail Account, sowie alle anderen Dienste, bei denen
du registriert bist, unterschiedliche Passwörter verwendest. So erhält ein Angreifer nie Zugriff auf alle deine Accounts gleichzeitig
und du kannst Passwörter sehr einfach ändern.

Es empfiehlt sich die Verwendung eines Passwortmanagers, z.B. [Bitwarden](https://bitwarden.com/).

:::tip
Alle Befehl vom 2FA-System kannst du [hier](../commands#zwei-faktor-authentifizierung) finden.
:::