import moment from "moment";

class MomentService {

    async dateFromNow(dateSended) {
        const date = new Date(dateSended).getTime();
        moment.updateLocale("en", {
            relativeTime: {
                future: "dans% s",
                past: "il y a% s",
                s: "quelques secondes",
                m: "une minute",
                mm: "% d minutes",
                h: "une heure",
                hh: "% d heures",
                d: "un jour",
                dd: "% d jours",
                M: "un mois",
                MM: "% d mois",
                y: "un an",
                aa: "% d ans",
            },
        });
        moment.locale("fr");
        return moment(date).fromNow();
    }


}

export default new MomentService();