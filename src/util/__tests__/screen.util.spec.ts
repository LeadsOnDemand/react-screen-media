import { Resolution } from '../../constants/resolution';
import { _PIXEL_RATIOS, clearPixelRatio, getPixelRatio } from '../screen.util';

describe('screen util', () => {

	beforeEach(() => {
		clearPixelRatio();
	});

	test('default', () => {

		(window as any).devicePixelRatio = undefined;
		(window as any).screen.systemXDPI = undefined;
		window.matchMedia = undefined;

		const result = getPixelRatio();

		expect(result).toEqual(1.0);

	});

	test('default (no match)', () => {

		(window as any).devicePixelRatio = undefined;
		(window as any).screen.systemXDPI = undefined;
		window.matchMedia = jest.fn(() => ({
			matches: false
		}));

		const result = getPixelRatio();

		expect(result).toEqual(1.0);

	});

	test('window.devicePixelRatio', () => {

		const pixelRatio = 1.3;
		(window as any).devicePixelRatio = pixelRatio;

		const result = getPixelRatio();

		expect(result).toEqual(pixelRatio);

	});

	test('window.screen.systemXDPI', () => {

		(window as any).devicePixelRatio = undefined;
		(window as any).screen.systemXDPI = 300;
		(window as any).screen.logicalXDPI = 100;

		const result = getPixelRatio();

		expect(result).toEqual(3);

	});

	test('window.matchMedia', () => {

		(window as any).devicePixelRatio = undefined;
		(window as any).screen.systemXDPI = undefined;

		window.matchMedia = jest.fn(() => ({
			matches: true
		}));

		const result = getPixelRatio();

		expect(result).toEqual(2.0);

	});

	test('window.matchMedia all', () => {

		(window as any).devicePixelRatio = undefined;
		(window as any).screen.systemXDPI = undefined;

		window.matchMedia = jest.fn((value) => {

			if (value === _PIXEL_RATIOS[Resolution.X0_50]) {
				return {matches: true};
			} else {
				return {matches: false};
			}

		});

		expect(getPixelRatio()).toEqual(.5);

		clearPixelRatio();

		window.matchMedia = jest.fn((value) => {

			if (value === _PIXEL_RATIOS[Resolution.X0_75]) {
				return {matches: true};
			} else {
				return {matches: false};
			}

		});

		expect(getPixelRatio()).toEqual(.75);

		clearPixelRatio();

		window.matchMedia = jest.fn((value) => {

			if (value === _PIXEL_RATIOS[Resolution.X1_00]) {
				return {matches: true};
			} else {
				return {matches: false};
			}

		});

		expect(getPixelRatio()).toEqual(1);

		clearPixelRatio();

		window.matchMedia = jest.fn((value) => {

			if (value === _PIXEL_RATIOS[Resolution.X1_25]) {
				return {matches: true};
			} else {
				return {matches: false};
			}

		});

		expect(getPixelRatio()).toEqual(1.25);

		clearPixelRatio();

		window.matchMedia = jest.fn((value) => {

			if (value === _PIXEL_RATIOS[Resolution.X1_50]) {
				return {matches: true};
			} else {
				return {matches: false};
			}

		});

		expect(getPixelRatio()).toEqual(1.5);

		clearPixelRatio();

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
