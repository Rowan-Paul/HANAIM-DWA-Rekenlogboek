## 7 Infrastructuur architectuur

In dit hoofdstuk wordt de infrastructuur getoond van de applicatie. Bij het maken van dit project wordt gebruik gemaakt van Git, dus als er iets misgaat kan vanaf daar de data hersteld worden.

<!-- wordt dit niet duidelijk in context diagram? -->

### 7.1 Lokale ontwikkelomgeving

Tijdens het ontwikkelen van de applicatie, wordt er gebruik gemaakt van een lokale ontwikkelomgeving. De applicatie zal draaien op `localhost` en zal live updaten wanneer er veranderingen worden gemaakt. De front-end en server zullen gebruik maken van twee verschillende poorten. Het testen gebeurt ook binnen de lokale ontwikkelomgeving.

Het werken met Teams in een lokale ontwikkelomgeving is beschreven in het [Teams integratie onderzoek](../onderzoek-teams-integratie/readme.md)

### 7.2 Deployed ontwikkelomgeving

Het deployen van de site gebeurt op een Azure server die node kan draaien voor de server en react voor de front-end.

<!-- Iets meer informatie over wat voor server etc -->

Het ondersteunen en onderhouden van de applicatie tijdens deployment is niet de verantwoordelijkheid van het team, zoals beschreven in hoofdstuk 4.
