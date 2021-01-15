## 7 Infrastructuur architectuur

In dit hoofdstuk wordt de infrastructuur getoond van de applicatie. Bij het maken van dit project wordt gebruik gemaakt van Git, dus als er iets misgaat kan met Git de data hersteld worden.

---

### 7.1 Lokale ontwikkelomgeving

Tijdens het ontwikkelen van de applicatie, wordt er gebruik gemaakt van een lokale ontwikkelomgeving. De applicatie zal draaien op `localhost` en zal live updaten wanneer er veranderingen worden gemaakt via een Webpack server. De client-side en server-side zullen gebruik maken van twee verschillende poorten. Het testen gebeurt ook binnen de lokale ontwikkelomgeving.

Het werken met Teams in een lokale ontwikkelomgeving is beschreven in het [Teams integratie onderzoek](../onderzoek-teams-integratie/readme.md).

Voordat nieuwe features gemerged worden in de development branche worden deze aan testen ondervonden. In onderstaande alinea's wordt er ingegaan op de verschillende testen die gehanteerd worden. Alle testen wordten gedraaid met behulp van het test framework [Jest](https://jestjs.io/).

#### 7.1.1 Unit-testen

De unit-testen bevinden zich op de server-side van de applicatie. Hier worden de verschillende routes van de API getest.

De unit-testen kunnen gestart worden op de server-side met het volgende commando `npm start test`

#### 7.1.2 E2E-testen

De client-side van de applicatie wordt ook getest door middel van end-to-end testen (e2e). Om deze testen te kunnen draaien wordt er gebruik gemaakt van Puppeteer (https://pptr.dev/) i.c.m. met Jest.

Puppeteer maakt het mogelijk om bepaalde flows binnen de applicatie geautomatiseerd te testen via de Chromium browser. In onderstaande tabel bevinden zich de verschillende testen.

Bij sommige testen bevind zich ook een seed file. Deze seed files bevinden zich op de server-side server en zijn nodig om de test te laten slagen. Seed files kunnen geinstalleerd worden met het volgende commando op de server-side server: `node seed_file_name.js`.

| #   | Test                        | Omschrijving                                                                         | Seedfile                   |
| --- | --------------------------- | ------------------------------------------------------------------------------------ | -------------------------- |
| 1.  | Inloggen met Microsoft      | Automatisch inloggen op Microsoft via applicatie                                     | -                          |
| 2.  | Aanmaken nieuw logboek      | Aanmaken nieuw logboek                                                               | -                          |
| 3.  | Bekijken groepsoverzicht    | Bekijken van een groepsoverzicht + websocket implementatie i.c.m. studentenpagina's. | groupoverview.test.seed.js |
| 4.  | Bekijken studentenlogboeken | Inzien van logboeken per student.                                                    | -                          |
| 5.  | Wijzigen studententoegang   | Wijzig het formulier waar de student toegang tot heeft.                              | studentaccess.test.seed.js |
| 6.  | Studentpagina's             | Testen van het invullen van invoervelden en versturen van vragen.                    | -                          |

_Tabel 2: E2E-test overzicht._

### 7.2 Deployed ontwikkelomgeving

Het was wenselijk om het project te deployen op een Azure server, helaas is het het team niet gelukt om dit voor elkaar te krijgen. Mocht een volgend ontwikkelteam dit alsnog voor elkaar willen krijgen dan staat voor hun in het volgende hoofdstuk een deployment diagram die weergeeft hoe het geheel gedeployed zou kunnen worden via Azure.

Daarnaast wordt ook beschreven hoe de server-side bijvoorbeeld op een VPS kan draaien met Ubuntu 20.04.

Het ondersteunen en onderhouden van de applicatie tijdens deployment is niet de verantwoordelijkheid van het team, zoals beschreven in hoofdstuk 4.
