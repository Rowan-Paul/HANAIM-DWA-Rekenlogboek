## 8 Deployment

In dit hoofdstuk wordt besproken hoe de applicatie precies wordt gedeployed. De applicatie bestaat eigenlijk uit 2 delen die apart zouden moeten worden gedeployed: de client-side en de server-side.

### 8.1 Deployment diagram

Hieronder staat het deployment diagram waarin weergeven wordt hoe het project kan worden gebruikt.

@import "./c4-model/Deployment diagram.svg"

### 8.2 Deployen van de Microsoft Teams app

Microsoft Teams is een dominante speler binnnen educatie en ook onze opdrachtgever maakt gebruik van Teams. De applicatie moet dan ook (gedeeltelijk) beschikbaar zijn op Microsoft Teams. Dit kan gedaan worden door de volgende stappen te volgen.

#### 8.2.1 Microsoft 365 Developer

Om apps te kunnen uploaden naar Teams moet een account een Microsoft 365 Developer zijn. Voor onze doelstelling was het logisch om één apart account te kunnen gebruiken voor het gehele team. De volgende stappen moet je hiervoor uitvoeren:

1. Je hebt een bestaand of [nieuw Microsoft account](https://account.microsoft.com/account) nodig. Aan dit account is een naam en telefoonnummer gekoppeld
2. Daarna moet je je [aanmelden voor het Microsoft 365 Developer Program](https://developer.microsoft.com/en-us/microsoft-365/dev-program). Hier is tijdens het ontwikkelen gekozen om een gratis proefversie van 92 dagen te nemen van Microsoft E5 subscription, maar elk ander abonnement dat Teams heeft zal moeten werken.
3. Een administrator account met bijbehorende email en inloggegevens is aangemaakt. Met dit account wordt ingelogd op Teams.

Microsoft beveelt aan om ook nog een voorbeeld populatie toe te voegen via het [Microsoft 365 Dev Center](https://developer.microsoft.com/en-us/microsoft-365/profile/). Hier log je in met je Microsoft account. Dit kan best lang duren (voor ons duurde het 30+ minuten).

Via het administrator account kan je accounts aanmaken in het [Office365 admin center](https://portal.office.com/adminportal/). Voor onze applicatie zijn wij ervan uitgegaan dat leerlingen en leraren een _jobTitle_ krijgen met of leraar of leerling en logboekontwerpers in een groep zitten genaamd Logboekontwerpers.

#### 8.2.2 Teams instellen

Voor de applicatie zijn we er vanuit gegaan dat alle leraren in hun eigen Team zitten met hun leerlingen

Om de juiste permissies te hebben voor Teams moet je naar het [Teams admin panel](https://admin.teams.microsoft.com/dashboard) te gaan en de permissies aan te passen zodat leraren apps kan toevoegen. Dit doe je door in de zijbalk naar `Teams apps` -> `setup policies` te gaan. Maak een nieuwe policy aan genaamd `leraar` of zo en dan bovenaan `upload custom apps` aanzetten.

Geef elke leraar deze policy door naar `Users` -> leraar naam -> `policies` -> `Edit` knop naast assigned policies in te drukken. Selecterr nu bij App setup policy de policy die je net hebt gemaakt.

#### 8.2.3 App toevoegen aan organisatie

De app in Teams is eigenlijk gewoon een iframe waarin de React app wordt getoond binnen Teams. Je moet wel een zogenaamd App Manifest maken om het aan Teams te kunnen toe te voegen. Dit kan je doen de App Studio app te installeren en daar naar `manifest editor` te gaan en te drukken op `new app`.

Vul hierin de gevraagde gegevens in het app de pagina `App details` helemaal in en klik daarna aan de linkerkant op `Tabs` en selecteer je config bestand (waarschijnlijk website /config). Scroll aan de linkerkant helemaal naar beneden en selecteer `Test and distrubute`. Nu kan je op `Download` drukken om een zip te downloaden met het manifest.

Om de app te uploaden, ga naar `Teams apps` -> `Manage apps` en druk dan op upload. Upload hier de zip die je hebt gedownload uit de App Studio. Als het goed is kan iedereen met de juiste permissies de app nu zien.

Het kan enkele uren duren voordat deze veranderen worden toegepast en leraren daadwerkelijk apps kunnen installeren.

#### 8.2.4 App toevoegen aan team

Als leraar, navigeer naar je team en druk op het plusje. Zoek naar de naam van je app en klik erop. Je komt nu op de config pagina, druk op op opslaan om de app toe te voegen aan je team.

Nu kunnen alle leden van het team de app zien in hun bovenbalk en ook gebruiken. Als je een foutmelding krijgt, kan het zijn dat je permissies niet goed ingesteld zijn of je enkele uren moet wachten totdat de veranderen in permissies zijn toegepast.

### 8.3 SSL

Tijdens het ontwikkelen van de app is er vanuit gegaan dat de client-side HTTPS zou gebruiken, omdat dit een vereiste is voor het gebruik van Teams. Alle site addressen staan in een env variabel, dit betekent dat je ze maar op één plek hoeft aan te passen (het `.env` bestand in de root van de client en server.
