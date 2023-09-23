import moment from "moment-timezone";

interface UtilDate {
    timerCountDownInterval: any;
    timerCountDownTS: any;
    lastLoginTimeString(date: string): string,

    convertTimeString(date: string, timezone: string): string

    timerCountDown: (tzData: string) => void;
}


export const useUtilDate = (): UtilDate => {
    const timerCountDownInterval: any = ref(null);
    const timerCountDownTS: any = ref(moment.tz("Europe/Dublin").format("YYYY-MM-DD HH:mm:ss"));

    const lastLoginTimeString = (date: string): string => {
        const today = moment();
        const diff = today.diff(date, "days");
        if (diff > 6) {
            return moment.utc(date).local().format("YYYY-MM-DD h:mm a");
        }
        return moment.utc(date).local().format("dddd, h:mm a");
    }
    const convertTimeString = (date: string, timezone: string): string => {
        if (timezone) {
            return moment.utc(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
        } else {
            return moment.utc(date).local().format("YYYY-MM-DD HH:mm:ss");
        }
    }

    const timerCountDown = (tzData: string) => {
        timerCountDownInterval.value = setInterval(() => {
            timerCountDownTS.value = moment.tz(tzData).format("YYYY-MM-DD HH:mm:ss");
        }, 1000);
    };

    onBeforeRouteLeave(() => {
        clearInterval(timerCountDownInterval.value);
    });

    onUnmounted(() => {
        clearInterval(timerCountDownInterval.value);
    });

    return {
        timerCountDownInterval,
        timerCountDownTS,
        lastLoginTimeString,
        convertTimeString,
        timerCountDown
    }
}