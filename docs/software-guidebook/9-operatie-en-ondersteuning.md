## 9 Operatie en ondersteuning

In dit hoofdstuk wordt het opereren van de applicatie genoemd en de ondersteuning.

### 9.1 Het project lokaal laten draaien

In dit kopje staat beschreven hoe je het project lokaal kunt laten draaien door een aantal stappen te volgen.

_Let op: de server en de client moeten op aparte terminals draaien en zorg ervoor dat de poorten 3000 en 3001 beschikbaar zijn._

#### Stap 1 - Vooraf

Programmas die vooraf moeten zijn geïnstalleerd:

- Node.js
- Robo 3T

Als je een van deze programma's niet hebt, download deze dan eerst.

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

Zoals besproken in hoofdstuk 4, geeft het team geen ondersteuning na het opleveren. Maar als het goed is moet een ieder developer met behulp van dit software guidebook de applicatie goed genoeg ondersteunen. Ook zorgt het team voor goede comments bij de code zelf die het abnormale dingen uitleggen.

Vanwege de gelimiteerde tijd en scope worden op dit moment errors gelogged op de console. Er is dus niet een specifieke error afhandeling in plaats op dit moment.
