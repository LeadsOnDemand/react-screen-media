import {_PIXEL_RATIOS, getPixelRatio} from "../screen.util";
import {Resolution} from "../../constants/resolution";

describe('screen util', () => {

    test('default', () => {

        window.devicePixelRatio = undefined;
        window.screen.systemXDPI = undefined;
        window.matchMedia = undefined;

        const result = getPixelRatio();

        expect(result).toEqual(1.0);

    });

    test('default (no match)', () => {

        window.devicePixelRatio = undefined;
        window.screen.systemXDPI = undefined;
        window.matchMedia = jest.fn(() => ({
            matches: false
        }));

        const result = getPixelRatio();

        expect(result).toEqual(1.0);

    });

    test('window.devicePixelRatio', () => {

        const pixelRatio = 1.3;
        window.devicePixelRatio = pixelRatio;

        const result = getPixelRatio();

        expect(result).toEqual(pixelRatio);

    });

    test('window.screen.systemXDPI', () => {

        window.devicePixelRatio = undefined;
        window.screen.systemXDPI = 300;
        window.screen.logicalXDPI = 100;

        const result = getPixelRatio();

        expect(result).toEqual(3);

    });

    test('window.matchMedia', () => {

        window.devicePixelRatio = undefined;
        window.screen.systemXDPI = undefined;

        window.matchMedia = jest.fn(() => ({
            matches: true
        }));

        const result = getPixelRatio();

        expect(result).toEqual(2.0);

    });

    test('window.matchMedia all', () => {

        window.devicePixelRatio = undefined;
        window.screen.systemXDPI = undefined;

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X0_50]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(.5);

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X0_75]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(.75);

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X1_00]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(1);

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X1_25]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(1.25);

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X1_50]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(1.5);

        window.matchMedia = jest.fn((value) => {

            if (value === _PIXEL_RATIOS[Resolution.X2_00]) {
                return {matches: true};
            } else {
                return {matches: false};
            }

        });

        expect(getPixelRatio()).toEqual(2);

    });

});