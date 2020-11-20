## Ontwikkelen voor Teams

Na het opzetten van een Microsoft 365 Developer account en administrator account kan met het administrator account worden ingelogd op Teams. Het meest logische voor onze doelstelling was om een tab te maken, maar [hier staan andere mogelijkheden](https://docs.microsoft.com/en-us/microsoftteams/platform/samples/integrating-web-apps#get-to-know-teams-platform-capabilities). Een tab binnen Teams is eigenlijk een normale React app.

In de documentatie die hieronder staat wordt een apart project aangemaakt voor de Teams, maar je kan ook een al bestaande app integreren met Teams. Dit wordt uitgelegd onder het kopje 'Integratie met een al bestaande app'.

Nu is het een kwestie van de [Microsoft Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) te installeren uit de Visual Studio Code Marketplace en [Get Started: Build and run your first Microsoft Teams app](https://docs.microsoft.com/en-us/microsoftteams/platform/build-your-first-app/build-and-run) van de Microsoft Docs te lezen. Hierin wordt uitgelegd hoe je een app toevoegd aan je persoonlijke Teams. Het opzetten ngrok is niet nodig voor het runnen van een tab.

Problemen die kunnen optreden zijn dat de app weigert toegevoegd te worden aan een account omdat je niet de juiste permissies hebt, ookal ben je een adminorstrator. Dit gebeurde mij ook en deze error verdween vanzelf weer na iets meer dan een uur.

Ook kan het helpen om in het [Teams admin panel](https://admin.teams.microsoft.com/dashboard) de permissies aan te passen zodat iedereen apps kan toevoegen. Dit doe je door in de zijbalk naar `Teams apps` -> `setup policies` te gaan en dan te kiezen voor de `global` policies en dan bovenaan `upload custom apps` aanzetten (uiteraard kan je ook een custom policy maken, maar dit is gemakkelijker voor nu).
