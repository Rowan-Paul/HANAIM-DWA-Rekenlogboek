## 9 Operatie en ondersteuning

In dit hoofdstuk wordt het opereren van de applicatie genoemd en de ondersteuning.

### 9.1 Het project lokaal laten draaien

In dit kopje staat beschreven hoe je het project lokaal kunt laten draaien door een aantal stappen te volgen.

_Let op: de server en de client moeten op aparte terminals draaien en zorg ervoor dat de poorten 3000 en 3001 beschikbaar zijn._

#### Stap 1 - Vooraf

Dit zijn de programma's die vooraf moeten zijn geïnstalleerd:

- Node.js v14.15.3
- MongoDB v3.6.3
- Robo 3T (aanbevolen), Studio 3T of een andere MongoDB client

Als je een van deze programma's niet hebt, download deze dan eerst. De versie die hierboven staan aangegeven zijn gebaseerd op de versies die het ontwikkelteam heeft gebruikt. Wij kunnen niet garanderen dat de applicatie werkt op eerdere versies.

Clone daarna repository naar je lokale machine en open de repository in een code editor.

#### Stap 2 - Server opstarten

Open een terminal en navigeer in de terminal naar de folder `server-side`. Run daarna de volgende commands om de server correct te laten starten:

```
npm install
node app.js
```

De server draait nu op poort `3000`.

Het kan handig zijn om wat testdata in de database te hebben staan. Hiervoor kun je de de volgende command runnen in de terminal:

```
node seed.js
```

#### Stap 3 - Client opstarten

Open een nieuwe terminal en navigeer in de terminal naar de folder `client-side`. Run daarna de volgende commands om de client correct te laten starten:

```
npm install
npm start
```

De browser wordt nu geopend en `localhost:3001` wordt getoond.

### 9.2 Operatie

In principe kan de site zodra hij gedeployed is, gelijk worden gebruikt. Als de office 365 omgeving goed is ingesteld, dus dat elke leerkracht en leerling de goede _job title_ heeft en er al teams bestaan waaraan de applicatie kan worden toegevoegd hoeft er niks handmatig worden ingevoerd.

### 9.3 Ondersteuning

Zoals besproken in hoofdstuk 4, geeft het team geen ondersteuning na het opleveren. Maar het Software Guidebook is zo ingericht dat iedere developer met behulp van dit software guidebook de applicatie goed genoeg zou kunnen moeten begrijpen om er in de toekomst mee verder te kunnen werken. Ook zorgt het team voor comments bij de code die complexere delen van de code uitleggen.

Vanwege de gelimiteerde tijd en scope worden op dit moment errors gelogged in de server-side op de console. Er is dus niet een specifieke error afhandeling in plaats op dit moment, maar op zo veel mogelijk locaties binnen de code hebben we ons best gedaan om fouten op te vangen en goed te verwerken zodat beveligingslekken worden voorkomen en de gebruiker ongehinderd de applicatie kan gebruiken.
