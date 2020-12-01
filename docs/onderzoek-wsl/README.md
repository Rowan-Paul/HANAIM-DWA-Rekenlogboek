# Onderzoek WSL

Er is een onderzoek gedaan naar Windows Subsystem For Linux, een manier om Linux commands uit te voeren binnen Windows. De bedoeling was om hiermee SSL certificaten te gebruiken op de lokale ontwikkelomgeving omdat de Microsoft Teams app niet SSL verbindingen accepteert zonder geldig certificaat, maar dit is niet gelukt.

Wat WSL doet is de Windows bestanden een soort van klonen naar de Linux omgeving en daar de commands uitvoeren. Hiervoor is ook Visual Studio Code Remote extensie nodig om te verbinden.

## Gevolgde stappen

Er is gebruik gemaakt van de volgende tutorials:

- [Microsoft Docs: Install WSL](https://docs.microsoft.com/en-gb/windows/wsl/install-win10)
- [Set up your Node.js development environment with WSL 2](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2)
- [Setting up MongoDB on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04)
- [VSC: Working with WSL](https://code.visualstudio.com/docs/remote/wsl)

De Linux distributie die gebruikt is was Ubuntu 20.04, de laatste LTS versie. Er is gebruik gemaakt van Windows Terminal en Visual Studio Code. Het installeren van NodeJS en NPM ging goed, maar met het installeren van de node modules bleek dat de package.json niet goed was. Dit is verbeterd, en alles installeerde goed. Ook werkte MongoDB (voor zover dat het geen errors gaf tijdens het runnen van de server).

Het probleem kwam bij het installeren van certificaten. Het generen van de certificaten was erg simpel met OpenSSL en ook het installeren op Microsoft Management Console lukte goed. Maar waarneer de site geladen wordt, geeft het nog steeds aan dat de site onveilig is. Na een kort onderzoek leek dat op te lossen met een extra parameter in OpenSSL, maar dat lukte niet.

## Problemen

Tegen de volgende punten liepen wij aan:

1. File I/O is erg sloom en onhandig. Het starten van de de client duurt 4 minuten, de server ongeveer de helft. Ook werken "live" update niet dus moet na elke verandering het opnieuw worden opgestart. En soms dan zijn de bestanden in VSC out-of-sync met de bestanden in de terminal (verwacht dat ook is omdat veranderingen niet worden doorgegeven)
2. Certificaten werken, maar er is nog steeds een error. Het installeren van het certificaat werkt, maar hij geeft nog steeds een error over dat het niet kan bewijzen localhost zijn (dit kan worden opgelost door extra parameters aan openssl mee te geven, maar dit is niet gelukt)
3. De database is niet te bereiken via de WIndows instantie van Robo3T, dus het aanpassen van de DB zal veel lastiger gaan (WSL is alleen command line namelijk). Mongodb is ook niet officieel ondersteund voor WSL, maar voor nu lijkt het te werken. Ook kan mongo niet automatisch worden opgestart via WSL want die gebruikt niet systemcli (wel iets anders, wat niet werkend is gekregen)
4. De gehele werkwijze van de mensen op Windows zal omgegooid worden. Alles moet opnieuw via WSL geïnstalleerd worden, wat samen met het installeren van WSL de zekere tijd in beslag zou nemen

## Conclusie

Aangezien er in de vorige sprint ook al tijd is besteed aan dit werkend krijgen en we genoeg te doen hebben, lijkt het ons het beste om het zo te laten.

Voor de sprint review zouden we eventueel de site op bv Azure kunnen zetten zodat het wel zou werken in de Teams app of het laten zien op een Mac van een van de studenten
