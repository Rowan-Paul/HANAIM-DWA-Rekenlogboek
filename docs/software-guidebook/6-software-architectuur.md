## 6 Software architectuur

Dit hoofdstuk gaat over de "big picture" van de software architectuur, dit laten we zien aan de hand van de container en component diagrammen van het C4 model

### 6.1 Diagrammen

Hieronder staan 3 verschillende diagrammen die de software architectuur duidelijk zullen moeten maken.

#### 6.1.1 Container diagram

In het container diagram hieronder is te zien hoe de verschillende systemen en gebruikers met elkaar communiceren. Het systeem bestaat uit 2 containers: de client-side en de server-side.

@import "./c4-model/containers.svg"

#### 6.1.2 Component diagram: client-side

Hieronder staat het component diagram van de client side die tracht in 1 oogopslag een overzicht te geven over de gehele client-side applicatie.

@import "./c4-model/components-client.svg"

#### 6.1.3 Component diagram: server-side

Hieronder staat het component diagram van de server side die tracht in 1 oogopslag een overzicht te geven over de gehele server-side applicatie.

@import "./c4-model/components-server.svg"

### 6.2 Bestandsstructuur

In onze project map zijn er verschillende mappen, namelijk:

- [docs](../../docs), hierin zitten de documenten die met het project te maken hebben
- [opdracht-rekenlogboek](../../opdracht-rekenlogboek), wat de opdracht bevat die we uitvoeren voor de PO
- [rekenlogboek](../../rekenlogboek), dit bevat de code van zowel de client-side als de server-side

Binnen in de map `rekenlogboek` staat de client-side en server-side app in twee aparte folder met elk hun eigen node modules, eslint, prettier, etcetera.

De client-side is opgedeeld in verschillende mappen voor verschillende onderdelen, met het mapje `src/js` de javascript code en de `src/redux` map alles voor de reducers bevattend. Afbeeldingen worden in het mapje `src/img` gestopt. Het hoofdbestand is het bestand [App.js](../../rekenlogboek/client-side/src/js/app.js) waarin de Router staat.

De server-side is opgedeeld in een map voor mongoose models en express routes. Het hoofdbestand is het bestand [app.js](../../rekenlogboek/server-side/app.js).

Afbeeldingen worden opgeslagen en geserved onder de `static` folder op de server, die een map bevat met uploads waarin bestanden geupload door gebruikers staat. Deze uploads maken gebruik van express-files en de `files` route. De path van de afbeelding wordt opgeslagen in de database base en kan worden opgehaald door de URL van de server (bv `http://localhost:3000`) ervoor te zetten

## 6.3 Login

Inloggen op de applicatie gebeurt via Microsoft omdat de school daar al gebruik van maakt. De login wordt afgehandeld in het bestand MicrosoftButton in de SignIn map binnen de client. Er wordt gebruik gemaakt van MSAL en Microsoft Graph modules om in te loggen, de naam, email, jobtitle en groepen van een gebruiker op te halen.

De informatie van MSAL wordt opgeslagen in de localstorage zodat de gebruiker maar 1 keer hoeft in te loggen binnen zowel de normale client als Teams.

Aan de hand van de jobtitle en groepen wordt bepaald welke 'rol' de gebruiker heeft binnen het programma. Zo hoeven wij binnen de database helemaal geen gebruikersdata bij te houden en ook niet te letten op de beveiliging hiervan.
