## Integratie met een al bestaande app

In de documentatie die hierboven staat wordt een apart project aangemaakt voor de Teams, maar je kan ook een al bestaande app integreren met Teams. De applicatie checkt of hij in Teams zit, en als dat het geval is laat hij andere pagina's zien.

Het probleem is alleen dat Teams alleen HTTPS URLs accepteert, dus moet er gebruik worden gemaakt van [ngrok](https://ngrok.com/). Volg de volgende stappen uit om een Teams app toe te voegen:

1. Maak een [create-react-app](https://create-react-app.dev/)
2. Installeer [ngrok](https://ngrok.com/) door het zip bestand uit te pakken. Open een terminal in dezelfde folder als de `ngrok.exe` en voer het volgende uit: `ngrok http 3000 --host-header=localhost:3000`. Je hebt nu een ngrok URL die 8 uur geldig is, kopieer deze.
3. Zorg ervoor dat je repo de `@microsoft/teams-js` node module heeft en checkt of er Teams gebruikt wordt. Zie ook [dit voorbeeld](react-teams-app)
4. Installeer "App studio" in je Microsoft Teams. Navigeer hier naartoe en selecteer `Edit Manifest` en daarna `Create a new app`. Voer bij de website de ngrok URL in die je gekregen hebt. Je krijgt een waarschuwing geen tunneling te gebruiken, maar dit kan je negeren. Nu kan je je app installeren op je team.

Tip: als je ngrok URL verlopen is kan je de al bestaande app wijzigen in App Studio, dus je hoeft niet nog een keer alles in te voeren.

Als het goed is heb je nu een web applicatie die zowel dingen in de web browser kan laten zien als in een Teams tab. In [dit voorbeeld](react-teams-app) zijn de pagina's die in Teams zichtbaar zijn niet zichtbaar in een normale browser omdat die de Teams SDK gebruiken.
