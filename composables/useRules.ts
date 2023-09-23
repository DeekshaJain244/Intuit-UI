export const useFormRules = () => {
    const {t} = useI18n()
    return {
        ruleRequired: (v: any) => !!v || "Required",
        ruleEmail: (value: any) => {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Enter a valid email";
        },
        rulePassLen: (v: string) => (!!v && v.length >= 6) || "Password must be 6 chars or more",
        ruleNoSpaces: (v: any) => /^\S*$/.test(v) || "Must not have spaces",
        ruleSpecialCharacters: (v: any) => !/[^A-Za-z0-9- _.]/.test(v) || "Must not have any special characters, Accepts only `space`  `-`  `_`",
        ruleMinLastName: (v: string) => v.length >= 2 || "Min 2 characters",
        rulePasswordRegex: (v: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$%^*#&])[A-Za-z\d@$%^*#&]{8,}$/.test(v) || "Password must be a greater or equal to 8 characters with a special character and a number in it",
        ruleExactLength: (v: string) => v.length === 9 || "Must be 9 characters long",
        ruleNumberType: (v: string | number) => Number.isInteger(Number(v)) || t("This value must be an integer number"),
        ruleCheckPort: (v: any) => (v < 65536 && v > 0) || t("This port is invalid"),
        ruleTimeout: (v: any) => (v <= 300 && v >= 60) || t("Timeout must be 60 >= and <= 300"),
        ruleIPAddress: (v: string) =>
            /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/gm.test(
                v
            ) || t("Invalid hostname or ip address"),
        ruleNoSpacingInStart: (v: string) => (v && v[0] !== " ") || t("Must not have spaces in the start"),
        ruleZipCode: (v: any) => {
            if (
                !/^[ABCEGHJ-NPRSTVXY]{1}[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[ ]?[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[0-9]{1}$/.test(v) // Canada
            ) {
                // eslint-disable-next-line
                if (!/^[0-9]{5}(-[0-9]{4})?$/) {
                    // US,IN
                    // eslint-disable-next-line
                    if (!/^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/) {
                        // UK
                        return t("Invalid Zip Code");
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        rulePhoneNumber: (v: any) => {
            if (v && v.length > 0) {
                for (let i = 0; i < v.length; i++) {
                    // if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v[i])) {
                    if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(v[i])) {
                        return t("Invalid Phone Number");
                    }
                }
                return true;
            } else return true;
        },
        ruleImageRule: (v: any) => {
            if (v) {
                return true;
            } else {
                return t("Image required");
            }
        },
    };
};