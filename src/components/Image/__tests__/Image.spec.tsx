import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import { Resolution } from '../../../constants/resolution';
import { Image } from '../Image';

describe('Image', () => {

	test('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render((
			<Image images={{
				[Resolution.X1_00]: 'test'
			}}/>
		), div);
	});

	test('pixel ratio present', () => {

		(window as any).devicePixelRatio = 1.2;

		const wrapper = mount((
			<Image images={{
				[1.2]: 'correct',
				[1.5]: 'wrong'
			}}/>
		));

		expect(wrapper.find('img').filterWhere((item) => item.prop('src') === 'correct')).toHaveLength(1);

	});

	test('pixel ratio not present', () => {

		(window as any).devicePixelRatio = 1.7;

		const wrapper = mount((
			<Image images={{
				[1.2]: 'wrong',
				[1.55]: 'correct',
				[1.75]: 'wrong'
			}}/>
		));

		expect(wrapper.find('img').filterWhere((item) => item.prop('src') === 'correct')).toHaveLength(1);

	});

});
