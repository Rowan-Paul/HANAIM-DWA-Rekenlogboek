# Software guidebook

## Inhoudsopgave

<!-- TOC -->

- [Software guidebook](#software-guidebook)
  - [Inhoudsopgave](#inhoudsopgave)
  - [1. Context](#1-context)
    - [1.1 Het project](#11-het-project)
    - [1.2 De applicatie](#12-de-applicatie)
    - [1.3 Huidige omgeving](#13-huidige-omgeving)
    - [1.4 Verschillende rollen](#14-verschillende-rollen)
    - [1.5 Context diagram](#15-context-diagram)
  - [2. Functional overview](#2-functional-overview)
    - [2.1 user stories](#21-user-stories)
    - [2.2 use cases (optional)](#22-use-cases-optional)
    - [2.3 UML-diagram (optional)](#23-uml-diagram-optional)
    - [2.4 Wireframes](#24-wireframes)
  - [3. Quality attributes](#3-quality-attributes)
    - [3.1 Performance](#31-performance)
    - [3.2 Scalability](#32-scalability)
    - [3.3 Availability](#33-availability)
    - [3.4 Security](#34-security)
  - [4. Constraints](#4-constraints)
  - [5. Principles](#5-principles)
  - [6. Software Architecture](#6-software-architecture)
  - [7. External interfaces](#7-external-interfaces)
  - [8. Code](#8-code)
  - [9. Data](#9-data)
  - [10. Infrastructure Architecture](#10-infrastructure-architecture)
  - [11. Deployment](#11-deployment)
  - [12. Operation and support](#12-operation-and-support)
  - [13. Decision log](#13-decision-log)

<!-- /TOC -->

---

## 1. Context

In dit hoofdstuk wordt de context van het project beschreven. Zo wordt er beschreven wat het project inhoud en wat er daadwerkelijk ontwikelt gaat worden.

Vervolgens wordt er ook beschreven hoe het project past in de bestaande omgeving. En tot slot wordt er beschreven wie het software gaan gebruiken.

---

### 1.1 Het project

In dit project wordt er een opdracht gerealiseerd die gekoppeld is aan het vak DWA (development webapplications).

Er wordt aan dit project gewerkt met vijf projectleden die gezamelijk een applicatie ontwikkelen.

---

### 1.2 De applicatie

In dit project wordt er een applicatie ontwikkelt die leerkrachten helpt bij het beter begeleiden van leerlingen.

Met behulp van de applicatie kan een leerling per aangeven of hij/zij een leerdoel begrijpt. Zo krijgt elke leerling een eigen digitaal logboek waarin wekelijks wordt bijgehouden of het leerdoel van de desbetreffende week duidelijk genoeg is.

De leerkracht evalueert de logboeken van de leerlingen en geeft leerlingen extra begeleiding indien nodig.

---

### 1.3 Huidige omgeving

In de huidige omgeving wordt er ook al gewerkt met logboeken. Op dit moment worden deze logboeken schriftelijk ingevuld door de leerlingen. Door dit te digitaliseren wordt het makkelijker voor de leerkracht om leerlingen te kunnen ondersteunen.

Het project kan dan ook als digitale transformatie worden beschouwd.

---

### 1.4 Verschillende rollen

Binnen de applicatie wordt er gewerkt met drie verschillende rollen. In de onderstaande tabel zijn de verschillende rollen en de daarbij behorende taken beschreven.

| #   | Rolen        | Taken                                                          |
| --- | ------------ | -------------------------------------------------------------- |
| 1.  | Logboekmaker | Maakt logboeken aan voor de verschillende leerjaren en blokken |
| 2.  | Logboekmaker | Voegt leerdoelen toe aan logboeken.                            |
| 3.  | Logboekmaker | Voorbereiden logboeken voor leerkrachten.                      |
| 4.  | Logboekmaker | Wijzigt/verwijdert logboeken indien nodig.                     |
| 5.  | Leerkracht   | Evalueert de logboeken van leerlingen.                         |
| 5.  | Leerling     | Reflecteert bij ieder leerdoel in een logboek.                 |

---

### 1.5 Context diagram

In de context diagram hieronder wordt de samenhang tussen de verschillende rollen en applicatie beschreven.

![Context diagram](./assets/context-diagram.svg)

---

## 2. Functional overview

In dit hoofdstuk bevinden zich verschillende diagrammen, tekeningen en tabellen die helpen bij het beter begrijpen van de applicatie.

---

### 2.1 user stories

In de tabel hieronder worden de verschillende user-stories toegelicht. Deze user-stories maken duidelijk welke eisen de verschillende rollen binnen de applicatie hebben.

| #    | Description                                                                                                                                                                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US01 | Als leerling wil ik een logboek invullen zodat ik kan inschatten bij welke leerdoelen ik hulp nodig heb                                                                                                                                        |
| US02 | Als logboekontwerper wil ik per blok leerdoelen kunnen toevoegen zodat ik de leerkracht kan helpen met het voorbereiden van een blok.                                                                                                          |
| US03 | Als logboekontwerper wil ik een logboek kunnen aanmaken zodat ik de leerkracht kan helpen met het voorbereiden van een blok.                                                                                                                   |
| US04 | Als leerkracht wil ik dat er automatisch in Microsoft Teams een agenda item komt te staan voor elke les zodat ik een overzicht heb van de lessen in een blok.                                                                                  |
| US05 | Als leerkracht wil ik een snel en makkelijk overzicht van de ingevulde logboeken zodat ik in de les snel kan kijken of een leerling assistentie nodig heeft.                                                                                   |
| US06 | Als leerling wil ik in mijn bestaande Microsoft Teams omgeving gebruik maken van de applicatie zodat ik geen nieuwe programma's en accounts hoef te gebruiken.                                                                                 |
| US07 | Als leerkracht wil ik een logboek kunnen toevoegen aan mijn teams omgeving. (Als leerkracht wil ik in mijn bestaande Microsoft Teams omgeving gebruik maken van de applicatie zodat ik geen nieuwe programma's en accounts hoef te gebruiken). |
| US08 | Als logboekontwerper wil ik het logboek kunnen aanpassen wanneer het al is ingevuld zodat ik fouten kan corrigeren.                                                                                                                            |
| US08 | Als leerkracht wil ik dat de leerlingen die aangegeven hebben in het logboek hulp nodig te hebben automatisch worden toegevoegd aan de juiste les zodat ik de les kan houden met alle leerlingen die hulp nodig hebben.                        |
| US10 | Als leerkracht wil ik een overzicht krijgen van oude logboeken zodat ik kan zien hoe de klas denkt te presteren.                                                                                                                               |
| US11 | Als leerling wil ik een speels uiterlijk zodat de applicatie mijn aandacht trekt.                                                                                                                                                              |
| US12 | Als leerling wil ik een chatbot die ik om hulp kan vragen tijdens het invullen van mijn logboek zodat ik dat zonder problemen kan doen.                                                                                                        |
| US13 | Als logboekontwerper wil ik voor het logboek templates kunnen gebruiken zodat ik een logboek voor een niveau maar één keer hoef te maken.                                                                                                      |
| US14 | Als leerkracht wil ik 2FA kunnen gebruiken zodat mijn informatie veilig blijft.                                                                                                                                                                |
| US15 | Als logboekontwerper wil ik automatisch de leerdoelen uit de leermethode halen zodat ik de leerdoelen niet elke keer opnieuw zelf hoef in te vullen.                                                                                           |
| US16 | Als logboekontwerper wil ik een logboek dat ik aan het bewerken ben opslaan als concept zodat ik een logboek niet in één keer hoef af te maken.                                                                                                |
| US17 | Als leerkracht wil ik kunnen kiezen voor een donker thema zodat ik ook in donkere omgevingen kan werken.                                                                                                                                       |
| US18 | Als leerkracht wil ik notities bij een leerling kunnen bijhouden zodat ik belangrijke info niet vergeet.                                                                                                                                       |

---

### 2.2 use cases (optional)

In dit hoofdstuk bevinden zich use cases. in deze use cases wordt de werking van verschillende processen in de applicatie werken.

_optional use cases_

---

### 2.3 UML-diagram (optional)

---

_optional uml diagrams_

### 2.4 Wireframes

---

## 3. Quality attributes

In dit hoofdstuk bevinden zich de verschillende kwaliteitseisen waaran het software moet voldoen. Deze kwaliteitseisen zijn onderverdeeld in de bijpassende deelhoofdstukken.

<!-- zie pdf voor toelichting  -->

---

### 3.1 Performance

<!-- Smart gedefineerd

    e.g. latency and througput
 -->

---

### 3.2 Scalability

<!-- Smart gedefineerd

    e.g. data and traffic volumes
 -->

---

### 3.3 Availability

<!-- Smart gedefineerd

    e.g. uptime,downtime, scheduled maintenance, 24x7, 99.9% etc
 -->

---

### 3.4 Security

<!-- Smart gedefineerd

    e.g. authentication, authorisation ,data confidentiality etc
 -->

---

## 4. Constraints

---

## 5. Principles

---

## 6. Software Architecture

---

## 7. External interfaces

---

## 8. Code

---

## 9. Data

---

## 10. Infrastructure Architecture

---

## 11. Deployment

---

## 12. Operation and support

---

## 13. Decision log

---
