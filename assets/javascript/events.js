// UAE, Qatar, Bahrain, Oman
const validCountries = ["ae", "qa", "bh", "om"]

fetch("https://phoenix-api.vatsim.net/api/events")
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw Error("Error getting events.")
        }
    })
    .then((data) => {
        let arbEvents = [];

        for (const event of data) {
            for (const airport of event.airports) {
                if (airport && validCountries.includes(airport.country.toLowerCase()) && !event.pushedToArbEvents) {
                    arbEvents.push(`<div><a href="${event.link}" target="_blank"><img src="${event.bannerLink}" style="height: 162px" /></a></div>`)
                    event.pushedToArbEvents = true;
                }
            }
        }
        document.getElementById("event-img-loading").style.visibility = "hidden";
        document.getElementById("event-images").innerHTML = arbEvents.join("")

    }).catch((err) => {
        console.log(err.message + " Will hide events section from document.");
        document.getElementById("events").style.display = "none"
    });