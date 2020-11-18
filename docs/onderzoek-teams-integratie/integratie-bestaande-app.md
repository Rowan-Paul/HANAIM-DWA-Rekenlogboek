## Integratie met een al bestaande app

In de documentatie die hierboven staat wordt een apart project aangemaakt voor de Teams, maar je kan ook een al bestaande app integreren met Teams. De applicatie checkt of hij in Teams zit, en als dat het geval is laat hij andere pagina's zien.

1. Maak een [create-react-app](https://create-react-app.dev/)
2. Maak een bestand aan genaamd `.env` in de root van je folder en zet er het volgende in: `HTTPS=true`. Voor gebruikers in een Mac omgeving kan je een .env.local met eventueel [een lokaal certificaat](https://flaviocopes.com/macos-install-ssl-local/). Hierna moet in de browser (als je niet op Mac een lokaal certificaat heb gemaakt) de stappen in de gif hieronder uitproberen.

![entering site without SSL certificate](assets/certificate.gif)

3. Zorg ervoor dat je repo de `@microsoft/teams-js` node module heeft en checkt of er Teams gebruikt wordt. Zie ook [dit voorbeeld](react-teams-app)
4. Installeer "App studio" in je Microsoft Teams. Navigeer hier naartoe en selecteer `Edit Manifest` en daarna `Create a new app`.

Als het goed is heb je nu een web applicatie die zowel dingen in de web browser kan laten zien als in een Teams tab. In [dit voorbeeld](react-teams-app) zijn de pagina's die in Teams zichtbaar zijn niet zichtbaar in een normale browser omdat die de Teams SDK gebruiken.
