import './index.sass'
import React, { useEffect, useState } from 'react'
import {ImageInst} from './Image';
import { intervalChangeId } from '../../utils/helpers';

const InstSlider = ({ className, images, timeout = 3000 }) => {
    let classForSliderName = className || '';
    let [activeId, setActiveId] = useState(0);

    useEffect(() => intervalChangeId(getNextImage(images), setActiveId, timeout), [images, timeout]);

    return (
        <div className={'carousels ' + classForSliderName}>
            {images.map((image, key) => {
                let imgClassName = (key <= activeId) && (key >= activeId-9) ? 'active' : '';
                return (<ImageInst className={'inst-block ' + imgClassName} image={image} key={key}/>)})}
        </div>
    )
};


function* getNextImage(images) {
    let i = 9;
    while (true) {
        i = i >= images.length - 1 ? 9 : ++i;
        yield i;
    }
}


export { InstSlider }
