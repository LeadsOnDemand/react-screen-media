import { Resolution } from '../constants/resolution';

export const _PIXEL_RATIOS: { [key: string]: string } = {
	// tslint:disable-next-line:max-line-length
	[Resolution.X0_50]: '(-webkit-min-device-pixel-ratio: 0.5), (min--moz-device-pixel-ratio: 0.5), (-o-min-device-pixel-ratio: 2/4), (min-resolution: 1.25dppx)',
	// tslint:disable-next-line:max-line-length
	[Resolution.X0_75]: '(-webkit-min-device-pixel-ratio: 0.75), (min--moz-device-pixel-ratio: 0.75), (-o-min-device-pixel-ratio: 3/4), (min-resolution: 0.75dppx)',
	// tslint:disable-next-line:max-line-length
	[Resolution.X1_00]: '(-webkit-min-device-pixel-ratio: 1.0), (min--moz-device-pixel-ratio: 1.0), (-o-min-device-pixel-ratio: 4/4), (min-resolution: 1.0dppx)',
	// tslint:disable-next-line:max-line-length
	[Resolution.X1_25]: '(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)',
	// tslint:disable-next-line:max-line-length
	[Resolution.X1_50]: '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 6/4), (min-resolution: 1.5dppx)',
	// tslint:disable-next-line:max-line-length
	[Resolution.X2_00]: '(-webkit-min-device-pixel-ratio: 2.0), (min--moz-device-pixel-ratio: 2.0), (-o-min-device-pixel-ratio: 8/4), (min-resolution: 2.0dppx)'
};

let _pixelRatio: number = -1;

/**
 * Clears the pixel ratio
 */
export const clearPixelRatio = () => {
	_pixelRatio = -1;
};

/**
 * Determines the pixel ratio from a query
 *
 * @private
 * @returns {number}
 */
const _determinePixelRatioFromQuery = (): number => {

	if (typeof window.matchMedia === 'undefined') {
		return _pixelRatio;
	}

	const resolutions = Object.keys(_PIXEL_RATIOS).map((value) => parseFloat(value)).sort();

	let index = resolutions.length;
	while (index--) {
		if (window.matchMedia(_PIXEL_RATIOS[`${resolutions[index]}`]).matches) {
			return resolutions[index];
		}
	}

	return _pixelRatio;

};

/**
 * Gets the pixel ratio for the screen
 * @returns {number}
 */
export const getPixelRatio = () => {

	if (_pixelRatio > 0) {
		return _pixelRatio;
	}

	if (typeof window.devicePixelRatio !== 'undefined') {
		return _pixelRatio = window.devicePixelRatio;
	} else if (typeof window.screen.systemXDPI !== 'undefined') {
		return _pixelRatio = window.screen.systemXDPI / window.screen.logicalXDPI;
	} else {

		_pixelRatio = _determinePixelRatioFromQuery();
		if (_pixelRatio < 0) {
			_pixelRatio = 1;
		}

		return _pixelRatio;

	}

};
