/*
 * Copyright (c) 2023 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

export class AnalyticType {
    static config = new AnalyticType("config");
    static manage = new AnalyticType("manage");
    static mapping = new AnalyticType("mapping");
    static none = new AnalyticType("none");
    public value: any;

    constructor(value:any) {
        this.value = value;
    }

    toString() {
        return `${this.value}`;
    }
}

export class DeviceType {
    static CAMERA = new DeviceType("CAMERA");
    static RADAR = new DeviceType("RADAR");
    static ACOUSTIC = new DeviceType("ACOUSTIC");
    static MOTION = new DeviceType("MOTION");
    static GPS = new DeviceType("GPS");
    public value: any;

    constructor(value: any) {
        this.value = value;
    }

    toString() {
        return `${this.value}`;
    }

    list() {
        return [DeviceType.ACOUSTIC, DeviceType.CAMERA, DeviceType.GPS, DeviceType.MOTION, DeviceType.RADAR];
    }

    icon() {
        switch (this.value) {
            case DeviceType.CAMERA.value:
                return "mdi-cctv";
            case DeviceType.RADAR.value:
                return "mdi-radar";
            case DeviceType.ACOUSTIC.value:
                return "mdi-microphone";
            case DeviceType.MOTION.value:
                return "mdi-motion-sensor";
            case DeviceType.GPS.value:
                return "mdi-crosshairs-gps";
        }
    }

    iconColor(isDark: any) {
        switch (this.value) {
            case DeviceType.CAMERA.value:
                return isDark ? "#bad2fb" : "#305B96";
            case DeviceType.RADAR.value:
                return isDark ? "#f0a8c9" : "#a43d67";
            case DeviceType.ACOUSTIC.value:
                return isDark ? "#bafbc5" : "#309641";
            case DeviceType.MOTION.value:
                return isDark ? "#e6bafb" : "#6d3096";
            case DeviceType.GPS.value:
                return isDark ? "#fecb7f" : "#966530";
        }
    }

    bgColor(isDark: any) {
        switch (this.value) {
            case DeviceType.CAMERA.value:
                return isDark ? "#305B96" : "#bad2fb";
            case DeviceType.RADAR.value:
                return isDark ? "#a43d67" : "#f0a8c9";
            case DeviceType.ACOUSTIC.value:
                return isDark ? "#309641" : "#bafbc5";
            case DeviceType.MOTION.value:
                return isDark ? "#6d3096" : "#e6bafb";
            case DeviceType.GPS.value:
                return isDark ? "#966c30" : "#fecb7f";
        }
    }
}

export class ModeType {
    static create = new ModeType("create");
    static update = new ModeType("update");
    static info = new ModeType("info");
    static delete = new ModeType("delete");

    static bulkDelete = new ModeType("bulkDelete");
    static bulkCreate = new ModeType("bulkCreate");
    static addAnalytics = new ModeType("addAnalytics");
    static assignAnalytics = new ModeType("assignAnalytics");

    static legendIcon = new ModeType("legendIcon");
    static legendIconString = new ModeType("legendIconString");

    static alertPreview = new ModeType("alertPreview");

    static none = new ModeType("none");
    public value: any;
    constructor(value: any) {
        this.value = value;
    }

    toString() {
        return `${this.value}`;
    }
}
