/*
 * Copyright (c) 2021-2022 Megh Computing, Inc.
 *
 * All rights reserved. No warranty, explicit or implied, provided.
 * Unauthorized use, modification, or distribution is strictly prohibited.
 */

interface Animate {
    settingsCardAnimation(target: any, action: string): any

    gridAnimation(target: any): void

    chipAnimation(target: any): void

    spinAnimation(target: any): void

    spinLoopAnimation(target: any, stop: boolean): void

    pulseAnimation(target: any, stop: boolean): void
}

// declare const useAnimate: Animate;

export const useAnimate = (): Animate => {
    const {$anime} = useNuxtApp()
    const settingsCardAnimation = (target: any, action: string) => {
        if (action === "fwd") {
            $anime({
                targets: target,
                translateX: 320,
                duration: 800,
            });
        } else if (action === "rev") {
            $anime({
                targets: target,
                translateX: 0,
                duration: 800,
            });
        }
    }
    const gridAnimation = (target: any) => {
        console.debug("grid animate")
        const {$anime} = useNuxtApp()
        $anime({
            targets: target,
            translateY: -10,
            direction: "alternate",
            duration: 600,
            easing: "cubicBezier(.5, .05, .1, .3)",
            loop: true,
        });
    }
    const chipAnimation = (target: any) => {
        $anime({
            targets: target,
            loop: true,
            translateX: -540,
            duration: 800,
        });
    }
    const spinAnimation = (target: any) => {
        $anime({
            targets: target,
            keyframes: [
                {rotate: -10},
                {rotate: 10},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
                {rotate: 0},
            ],
            duration: 800,
            easing: "linear",
        });
    }

    const spinLoopAnimation = (target: any, stop: boolean) => {
        if (stop) {
            $anime.remove(target);
        } else {
            $anime({
                targets: target,
                translateY: [0, -10, 0],
                loop: true,
                easing: "easeOutElastic",
                duration: 1200,
            });
        }
    }

    const pulseAnimation = (target: any, stop: boolean) => {
        if (stop) {
            $anime.remove(target);
        } else {
            $anime({
                targets: target,
                scale: [1, 1.5, 1],
                duration: 1000,
                loop: true,
                easing: "easeInOutQuad",
            });
        }
    }

    return {
        settingsCardAnimation,
        gridAnimation,
        chipAnimation,
        spinAnimation,
        spinLoopAnimation,
        pulseAnimation
    }
}
