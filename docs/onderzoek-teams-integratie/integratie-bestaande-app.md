## Integratie met een al bestaande app

In de documentatie die hierboven staat wordt een apart project aangemaakt voor de Teams, maar je kan ook een al bestaande app integreren met Teams. De applicatie checkt of hij in Teams zit, en als dat het geval is laat hij andere pagina's zien.

1. Maak een [create-react-app](https://create-react-app.dev/)
2. Zet in je `package.json` bij `scripts` het volgende: `"start": "set HTTPS=true&&react-scripts start",`. Voordat je de app kan toevoegen moet je naar je site gaan in dezelfde browser als dat je Teams gebruikt en aangeven dat de website veilig is, zie de gif hieronder.

![entering site without SSL certificate](assets/certificate.gif)

3. Zorg ervoor dat je repo de `@microsoft/teams-js` node module heeft en checkt of er Teams gebruikt wordt. Zie ook [dit voorbeeld](react-teams-app)
4. Installeer "App studio" in je Microsoft Teams. Navigeer hier naartoe en selecteer `Edit Manifest` en daarna `Create a new app`.

Als het goed is heb je nu een web applicatie die zowel dingen in de web browser kan laten zien als in een Teams tab. In [dit voorbeeld](react-teams-app) zijn de pagina's die in Teams zichtbaar zijn niet zichtbaar in een normale browser omdat die de Teams SDK gebruiken.
