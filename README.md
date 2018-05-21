# react-screen-media
Handles showing media based on device display and media queries

[![Build Status](https://travis-ci.org/LeadsOnDemand/react-screen-media.svg?branch=master)](https://travis-ci.org/LeadsOnDemand/react-screen-media)

```bash
> npm install --save @lod/react-screen-media
```

```typescript jsx
import {Image, Resolution} from '@lod/react-screen-media';

<Image images={{
    [Resolution.X2_00]: require('./assets/images/img-2x.png')
    [Resolution.X1_00]: require('./assets/images/img-2x.png')
}} />
```

```jsx harmony
<Image images={{
    '2.0': require('./assets/images/img-2x.png')
    '1.5': require('./assets/images/img-1_5x.png')
}} />
```