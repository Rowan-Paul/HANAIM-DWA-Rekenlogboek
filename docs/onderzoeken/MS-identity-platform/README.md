# Onderzoek Microsoft Identity Platform

Dit document bevat het resultaat van ons onderzoek naar MS identity platform. Er is gekeken naar hoe er binnen de applicatie onderscheid gemaakt kan worden tussen de verschillende rollen.

## Inhoudsopgave

<!-- TOC -->

- [Onderzoek Microsoft Identity Platform](#onderzoek-microsoft-identity-platform)
  - [Inhoudsopgave](#inhoudsopgave)
  - [1. Ophalen gebruikergegevens](#1-ophalen-gebruikergegevens)
  - [2. oAuth-flow](#2-oauth-flow)
    - [2.1 Sign in with Microsoft](#21-sign-in-with-microsoft)
    - [2.2 JWT-token](#22-jwt-token)
  - [3. Identificeren rol teams gebruikers](#3-identificeren-rol-teams-gebruikers)
  - [4. Rol toevoegen/wijzigen gebruiker](#4-rol-toevoegenwijzigen-gebruiker)

<!-- /TOC -->

## 1. Ophalen gebruikergegevens

Binnen het project willen we dat gebruikers kunnen inloggen met een office-365 account. Nadat een gebruiker is ingelogd, willen wij op basis van de gebruikersrol bepalen tot welke pagina's de desbetreffende gebruiker toegang heeft.

Uit onderzoek blijkt dat het 'inloggen via microsoft' mogelijk is via het oAuth2 principe. Hiermee kunnen er gebruikergevens van een persoon opgehaald worden, zonder dat deze gebruiker steeds hoeft in te loggen.

## 2. oAuth-flow

In dit hoofdstuk is beschreven hoe de oAuth flow van Microsoft werkt. Om deze flow te kunnen realiseren zijn de volgende voorbereidingen getroffen:

1. Opzetten van een office-365 omgeving.
2. Testgebruikers toegevoegd aan office omgeving.
3. Tentant-ID aangevraagd via Azure AD.

### 2.1 Sign in with Microsoft

### 2.2 JWT-token

![Microsoft oAuth2 flow](./img/convergence-scenarios-native.svg)

---

## 3. Identificeren rol teams gebruikers

---

## 4. Rol toevoegen/wijzigen gebruiker

---
