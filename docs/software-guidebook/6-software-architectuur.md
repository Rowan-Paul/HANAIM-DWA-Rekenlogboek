## 6 Software architectuur

Dit hoofdstuk gaat over de "big picture" van de software architectuur, dit laten we zien aan de hand van de container en component diagrammen van het C4 model

### 6.1 Diagrammen

Hieronder staan 3 verschillende diagrammen die de software architectuur duidelijk zullen moeten maken.

#### 6.1.1 Container diagram

In het container diagram hieronder is te zien hoe de verschillende systemen en gebruikers met elkaar communiceren. Het systeem bestaat uit 2 containers: de client-side en de server-side.

@import "./c4-model/containers.svg"

#### 6.1.2 Component diagram: Single Page Application

Hieronder staat het component diagram van de Single Page Application, ook wel de client-side genoemd, die tracht in 1 oogopslag een overzicht te geven over de gehele client-side applicatie.

@import "./c4-model/components-client.svg"

#### 6.1.3 Component diagram: Server

Hieronder staat het component diagram van de server die tracht in 1 oogopslag een overzicht te geven over de gehele server-side applicatie.

@import "./c4-model/components-server.svg"

### 6.2 Bestandsstructuur

In onze project map zijn er verschillende mappen, namelijk:

- [docs](../../docs), hierin zitten de documenten die met het project te maken hebben
- [opdracht-rekenlogboek](../../opdracht-rekenlogboek), wat de opdracht bevat die we uitvoeren voor de PO
- [rekenlogboek](../../rekenlogboek), dit bevat de code van zowel de client-side als de server-side

Binnen in de map `rekenlogboek` staat de client-side en server-side app in twee aparte folder met elk hun eigen node modules, eslint, prettier, etcetera.

De client-side is opgedeeld in verschillende mappen voor verschillende onderdelen, met het mapje `src/js` de javascript code en de `src/redux` map alles voor de reducers bevattend. Afbeeldingen worden in het mapje `src/img` gestopt. Het hoofdbestand is het bestand [App.js](../../rekenlogboek/client-side/src/js/app.js) waarin de Router staat.

```text
/src
    /img    -> Bevat afbeeldingen voor de paginas.
    /js     -> Bevat de containers en componenten voor de pagina's.
        /redux  -> Bevat de redux store, reducers en action creators.
    /scss   -> Bevat de styling voor de paginas.
```

De server-side is opgedeeld in een map voor mongoose models en express routes. Het hoofdbestand is het bestand [app.js](../../rekenlogboek/server-side/app.js).

```text
/models                 ->Hier staan de database models
/routes                 ->Hier worden de endpoints beschreven
/static/uploads/goals   ->Hier worden afbeeldingen voor de goals naar toe geüpload
app.js                  ->Hoofdbestand waarmee de server gestart kan worden
```

Afbeeldingen worden opgeslagen en geserved onder de `static` folder op de server, die een map bevat met uploads waarin bestanden geupload door gebruikers staat. Deze uploads maken gebruik van express-files en de `files` route. De path van de afbeelding wordt opgeslagen in de database base en kan worden opgehaald door de URL van de server (bv `http://localhost:3000`) ervoor te zetten

### 6.3 Real-time

In onze applicatie wordt gebruik gemaakt van real-time updates in het logboekoverzicht van de leraar. Wanneer een leerling een antwoord veranderd of toevoegt wordt er een WebSocket bericht gestuurd naar de leraar via `Socket.io`. Dit is de enigste plek in de applicatie waar real-time wordt gebruikt.
