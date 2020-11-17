## Tijdens het ontwikkelen

Als alles is opgezet dan kan iedereen door ngrok op te starten en met App Studio de app testen in Teams in hun eigen lokale omgeving. Dus kort opgenoemd:

1. Installeer [ngrok](https://ngrok.com/) door het zip bestand uit te pakken. Open een terminal in dezelfde folder als de `ngrok.exe` en voer het volgende uit: `ngrok http 3000 --host-header=localhost:3000`.
2. Kopieer de website adres dat je krijgt en gebruik die in App Studio.
3. Navigeer naar App Studio in Teams, selecteer `Edit Manifest`en selecteer daarna de app. Pas de websites aan met de nieuwe ngrok URL.
4. Installeer app in het team
