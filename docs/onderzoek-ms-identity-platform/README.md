# Onderzoek Microsoft Identity Platform

Dit document bevat het resultaat van ons onderzoek naar MS identity platform. Er is gekeken naar hoe er Microsoft gebruikers opgehaald kunnen worden om vervolgens de rol te bepalen.

## Inhoudsopgave

- [Inleiding](#inleiding)
- [1. Microsoft Identity platform](#1-microsoft-identity-platform)
  - [1.1 Wat is Microsoft Identity platform](#11-wat-is-microsoft-identity-platform)
  - [1.2 Hoe wij dit gaan gebruiken](#12-hoe-wij-dit-gaan-gebruiken)
  - [1.3 Hoe werkt de authentication service](#13-hoe-werkt-de-authentication-service)
  - [1.4 Gebruik JWT-token](#14-gebruik-jwt-token)
  - [1.5 Ophalen gebruikersRol met een JWT-token](#15-ophalen-gebruikersrol-met-een-jwt-token)
- [2. Rol toevoegen/wijzigen gebruiker](#2-rol-toevoegenwijzigen-gebruiker)
- [3. Code example](#3-code-example)
- [Bronnen](#bronnen)

## Inleiding

Binnen het project willen we dat gebruikers kunnen inloggen met hun office-365 account. Nadat een gebruiker is ingelogd, willen wij op basis van de gebruikersrol bepalen tot welke pagina's de desbetreffende gebruiker toegang heeft.

## 1. Microsoft Identity platform

In dit hoofdstuk wordt uitgelegd wat het Microsoft Identity platform is. Daarnaast wordt er ook uitgelegd hoe dit werkt.

---

### 1.1 Wat is Microsoft Identity platform

Micrsoft Identity platform is een authentication service waarmee je gebruikers in apps kan laten inloggen via Microsoft. Dit is erg handig omdat je zo geen eigen wachtwoorden hoeft op te slaan.

Daarnaast kun je na een autorisatie API's van andere Microsoft services aanspreken zonder daar in te hoeven loggen.

---

### 1.2 Hoe wij dit gaan gebruiken

Omdat wij voor het project de API van Micrsoft Teams gaan aanspreken hebben wij toegang nodig tot de info van de gebruikers.

Met het Microsoft Identity platform kunnen wij gebruikers laten autoriseren. Om vervolgens de data op te halen.

---

### 1.3 Hoe werkt de authentication service

De authentication service van Micrsoft werkt eigenlijk vrij simpel. Het begint met een redirect vanuit een eigen applicatie naar Microsoft. De gebruiker logt hier in en wordt weer teruggestuurd naar de applicatie (webhook). Zie onderstaande model.
![afbeelding ophalen jwt token](img/ophalen-token.svg)

Wanneer bovenstaand proces succesvol verlopen is, wordt er ook een response meegegeven aan de webhook.
Deze response bevat verschillende data en ziet er als volgt uit.

```json
{
  "uniqueId": "a0b8e924-e659-43d7-a071-bad869ee9ab6",
  "tenantId": "f0abd04a-9b19-44ba-9184-312e8524f92e",
  "scopes": ["openid", "profile", "User.Read", "email"],
  "account": {
    "homeAccountId": "a0b8e924-e659-43d7-a071-bad869ee9ab6.f0abd04a-9b19-44ba-9184-312e8524f92e",
    "environment": "login.windows.net",
    "tenantId": "f0abd04a-9b19-44ba-9184-312e8524f92e",
    "username": "admin@teamjaguarundi.onmicrosoft.com",
    "name": "Team Jaguarundi"
  },
  "idToken": "extreem lang",
  "idTokenClaims": {
    "aud": "4d0fb969-916b-42e5-8cdd-65a7f43fb847",
    "iss": "https://login.microsoftonline.com/f0abd04a-9b19-44ba-9184-312e8524f92e/v2.0",
    "iat": 1605702728, // Issued at time
    "nbf": 1605702728, // Not before
    "exp": 1605706628, // Expires
    "name": "Team Jaguarundi",
    "oid": "a0b8e924-e659-43d7-a071-bad869ee9ab6",
    "preferred_username": "admin@teamjaguarundi.onmicrosoft.com",
    "rh": "0.AAAAStCr8BmbukSRhDEuhST5Lmm5D01rkeVCjN1lp_Q_uEd6AMI.",
    "sub": "wnxYFHb-7GkrRM8x6lKXcGoZ-vfTbLcyK7qdow7flZI",
    "tid": "f0abd04a-9b19-44ba-9184-312e8524f92e",
    "uti": "Yi5DwRx6JUqyjUKpgZcaAA",
    "ver": "2.0"
  },
  "accessToken": "Extreem lang",
  "fromCache": false,
  "expiresOn": "2020-11-18T13:37:08.000Z",
  "extExpiresOn": "2020-11-18T14:37:07.000Z",
  "familyId": null,
  "tokenType": "bearer",
  "state": ""
}
```

In de response die terugkomt vanuit Microsoft na een succesvolle autorisatie zit ook een key genaamd `accessToken`.

Deze `accessToken` bevat een JWT-token. Met deze JWT-token kan er gebruikersdata opgehaald worden zonder opnieuw te hoeven autoriseren.

---

### 1.4 Gebruik JWT-token

Wanneer er een JWT-token is gegenereerd kan er data opgehaald worden. Dit doen we door de token mee te sturen tijdens een API request. Een JWT-token wordt meestal als `bearer token` meegeven in de authorization header.

---

### 1.5 Ophalen gebruikersRol met een JWT-token

Het doel van ons onderzoek was onderzoeken of we een rol van een gebruik konden ophalen. In onderstaande voorbeeld wordt beschreven hoe dit werkt via de Teams API.

**`GET`** : `https://graph.microsoft.com/v1.0/me`

**header**
`Authorization: Bearer {JWT-token hier}`

**Returns**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
  "businessPhones": [],
  "displayName": "Admin",
  "givenName": "Team",
  "jobTitle": "Beheerder",
  "mail": "admin@teamjaguarundi.onmicrosoft.com",
  "mobilePhone": null,
  "officeLocation": null,
  "preferredLanguage": "en-GB",
  "surname": "Jaguarundi",
  "userPrincipalName": "admin@teamjaguarundi.onmicrosoft.com",
  "id": "a0b8e924-e659-43d7-a071-bad869ee9ab6"
}
```

## 2. Rol toevoegen/wijzigen gebruiker

---

Naast het ophalen van rollen willen we deze ook kunnen aanmaken en wijzigen. Dit kan als volgt:

1. Bezoek het [Microsoft Admin panel](https://admin.microsoft.com/Adminportal/)
2. Klik links op de tab `Gebruikers`
3. Klik vervolgens op `Actieve gebruikers`
4. Selecteer een gebruiker of maak een nieuwe aan.
5. Klik in het uitschuifmenu op `contactgegevens beheren`
6. Wijzig de input `Functie` en sla dit vervolgens op.

![Foto met instructies](./img/voorbeeld.jpg)

---

## 3. Code example

In deze folder bevind zich ook een code example, deze is te starten als volgt:

1. `npm install`
2. `node index`
3. Ga naar `localhost:3000/auth` om in te loggen

## Bronnen

1. [Wat is het Microsoft Identity Platform](https://docs.microsoft.com/nl-nl/azure/active-directory/develop/v2-overview)
2. [Teams API](https://docs.microsoft.com/en-us/graph/teams-concept-overview)
