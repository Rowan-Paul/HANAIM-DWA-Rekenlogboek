## 6 Software architectuur

Dit hoofdstuk gaat over de "big picture" van de software architectuur, dit laten we zien aan de hand van de container en component diagrammen van het C4 model

### 6.1 Diagrammen

Hieronder staan 3 verschillende diagrammen die de software architectuur duidelijk zullen moeten maken.

#### 6.1.1 Container diagram

In de afbeelding hieronder is het container diagram te zien, gebaseerd op het C4 model.

@import "./c4-model/containers.svg"
_Afbeelding 2: Container diagram._

In het container diagram is te zien hoe de verschillende systemen en gebruikers met elkaar communiceren. Het systeem bestaat uit 3 containers: de Single Page Application, de Server en een database.

De Single Page Application is een react app die gebruikt maakt van websockets en redux. Alhoewel de SPA zelf geen data verstuurd via de websockets ontvangt hij dit wel vanuit de server. Wat de SPA wel verstuurd naar de server zijn de API requests via fetch. De server kan vervolgens met data via HTTPS of websockets een response geven. Wanneer er een PUT/POST request werd verstuurd naar de server zal de server een response geven op basis van de status van het request.

Verder is hier te zien dat de leeraar en leerling gebruikers niet alleen direct via de SPA werken, maar dat zij ook de optie hebben om vanuit de Microsoft Teams tab de applicatie kunnen benaderen.

In de component diagram Single Page Application staan meer details over de verschillen tussen gebruikers.

#### 6.1.2 Component diagram: Single Page Application

In de afbeelding hieronder is het component diagram voor de Single Page Application te zien (ook wel de client-side genoemd), gebaseerd op het C4 model.

@import "./c4-model/components-SPA.svg"
_Afbeelding 3: Component diagram - Single Page Application._

Aangezien de SPA redelijk uitgebreid is kwam het team al snel tot de conclusie om hier meerdere groeperingen te maken binnen het component diagram. Dit zorgt ervoor dat er veel minder pijlen nodig zijn en daardoor het diagram ook een stuk overzichtelijker is.

De groeperingen zijn vooral gebasseerd op welke omgevingen er binnen de applicatie beschikbaar zijn. Deze omgevingen geven onder andere aan voor welke gebruikers ze bedoeld zijn of voor welke functie ze dienen.

Alle gebruikers hebben dus een eigen omgeving waarvoor specifieke component(s) gemaakt zijn. De logboekontwerper, leraar en student omgevingen hebben ook allemaal hun eigen UI-components. Dit is een groepering aan kleinere components die per pagina ingeladen kunnen worden. Ze zijn echter niet van heel groot belang voor het component diagram en voor het overzicht hebben we ze daarom ook weggelaten.

De omgeving die er dan uitspringt is die van de ongeautoriseerde gebruiker. Aangezien gebruikers zonder de juiste rechten niet toegestaan zijn tot de belangrijke delen van de applicatie, worden ze vriendelijk doorgeleid naar een 'geen toegang' pagina.

Verder hebben de andere drie gebruikers dus allemaal belangrijke pagina's. Hieronder een simpel overzicht per gebruiker wat deze pagina's en hun bijbehorende subgroepen inhouden.

**Logboekontwerper**

- Index (LogbookDesigner): de hoofdpagina voor de logboekontwerper. Vanuit hier kan hij/zij kiezen om een nieuw logboek aan te maken.
- subgroep "Nieuw logboek pagina's": de pagina's die in deze subgroep staan moeten door een logboekontwerper worden doorlopen om een nieuw logboek te kunnen maken.

**Leraar**

- Index (Teacher): vanuit hier kan een leraar een overzicht zien van zijn/haar mogelijkheden binnen de applicatie. De leraar kan kiezen om studentenlogboeken in te zien, een groepsovericht te zien of om te bepalen welke pagina's beschikbaar zijn voor zijn/haar groep.
- Studentlogbook: de pagina waarin de leraar een logboek van zijn/haar leerlingen kan kiezen en inzien.
- Logbooks: de pagina waarin een overzicht staat van alle leerling logboeken.
- AllowStudentAccess: de pagina waarin de leraar kan aangeven wat de leerlingen van zijn/haar groep mogen zien.

**Student**

- subgroep "Studentlogboek invulpagina's": in deze subgroep staan alle pagina's die opengezet kunnen worden door de leraar van een leerling, met een bijbehorende eind pagina voor wanneer een leerling klaar is met het invullen van zijn/haar logboek.
- Default: wanneer een leraar geen logboek heeft openstaan zullen de leerlingen dit zien aan de hand van deze infopagina.

Naast de omgevingen die de gebruikers visueel kunnen zien is er ook nog een Redux en een Sign in omgeving. De Redux omgeving bevat in dit overzicht alle reducers en per reducer wordt er met pijlen aangegeven door wie ze gebruikt worden. De Sign in omgeving bevat alleen een Signin en succespagina voor het inloggen. De Sign in pagina maakt gebruik van Microsoft Teams data via een component genaamd tabConfig. Tabconfig vraagt namelijk data op uit het Microsoft Identity Platform. De Microsoft Teams tab die ook aan de tabConfig gekoppeld staat geld alleen voor de leraren en leerlingen die op Teams werken. In princiepe heeft dit direct effect op hun complete omgeving, maar omdat in de sign in omgeving de autorisatie wordt gedaan voor een gebruiker en wordt bepaald of ze op Microsoft Teams werken of niet leek het ons handig de Teams Tab hieraan te koppelen.

#### 6.1.3 Component diagram: Server

In de afbeelding hieronder is het component diagram voor de Server te zien, gebaseerd op het C4 model.

@import "./c4-model/components-server.svg"
_Afbeelding 4: Component diagram - Server._

in "6.1.2 Component diagram: Single Page Application" staat beschreven hoe de client-side eruit ziet, maar het is natuurlijk ook belangrijk om te weten hoe de client-side met de server-side communiceerd en hoe deze in elkaar zit. Om dit op te lossen hebben we een 2de component diagram gemaakt voor de server-side. Zoals u kan zien in zijn hier weer 2 groeperingen gemaakt voor een duidelijk overzicht.

De routes groepering bevat alle mogelijke route components waar de client-side requests naar kan sturen. De logbook en studentlogbook components kunnen vervolgens de schemas aanspreken uit de bijbehorende model files. Al is een request vanuit de client-side geldig dan kan er via het MongoDB Wire protocol een verzoek om data gedaan worden naar de MongoDB.

De file route is de enige route file zonder eigen schema. Dit komt, omdat deze file ook niks van de database vraagt. Hij slaat namelijk zelf images op op de server. De path naar deze images wordt door een andere request in de logbook route file afgehandeld.

Als laatst is het ook nog belangrijk om de verbinding met de client-side even kort aan te kaarten. Alle requests die via de client-side naar de server-sider gaan lopen over HTTPS en worden aangeroepen vanuit fetch. De responses van de server kunnen over zowel HTTPS als websockets zijn. Alle responses, inclusief de status codes worden terug gestuurd in een JSON format. De enigste route component dia websockets responses terugstuurt is de studentlogbook. Dit is namelijk van belang, omdat leraren zo direct kunnen zien wanneer logboeken worden gepdate

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
