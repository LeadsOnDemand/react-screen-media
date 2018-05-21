import * as React from 'react';

import {IMedia} from "../../types/media";
import {getPixelRatio} from "../../util/screen.util";

export interface IImageProps {
    images: IMedia;
}

export type ImageProps =
    IImageProps
    & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

export const Image: React.SFC<ImageProps> = (props) => {

    const ratio = getPixelRatio();
    const {images} = props;

    let source;
    if (images[`${ratio}`]) {
        source = images[`${ratio}`];
    } else {

        const resolutions = Object.keys(images).map((value) => parseFloat(value)).sort();

        let count = resolutions.length;
        while (count--) {
            if (ratio >= resolutions[count]) {
                source = images[`${resolutions[count]}`];
                break;
            }
        }

    }

    return (
        <img {...props} src={source}/>
    );

};