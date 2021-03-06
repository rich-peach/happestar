import './index.sass'
import React, { useState } from 'react';
import { Filter } from '../../components/Filter';
import { CatalogList } from '../../components/Catalog';
import { useFetch } from '../../utils/requests';
import { get_items } from '../../utils/requests';


const Catalog = () => {
    let items = useFetch(get_items, []);
    let tags = getTags(items);
    let sizes = getSizes(items);

    let [activeTags, setActiveTags] = useState([]);
    const toggleTag = getToggle(activeTags, setActiveTags);
    let [activeSizes, setActiveSizes] = useState([]);
    const toggleSize = getToggle(activeSizes, setActiveSizes);

    return (
        <div className='wrapper wrapper--flex  wrapper--indent-pb-small'>
            <Filter tags={tags} sizes={sizes} toggleTag={toggleTag}
            activeTags={activeTags} toggleSize={toggleSize} activeSizes={activeSizes}/>
            <CatalogList items={items} activeTags={activeTags} activeSizes={activeSizes}/>
        </div>
    )
};


function getTags(items) {
    if (items.length > 0) {
        return items.reduce((tags, item) => {
            let newTags = item.tags.filter((tag) => !tags.includes(tag));
            let uniqueTags = newTags.filter((tag, index) => newTags.indexOf(tag) === index);
            tags.push(...uniqueTags);
            return tags
        }, []);
    }
    else
        return []
}

function getSizes(items) {
    if (items.length > 0) {
        return items.reduce((sizes, item) => {
            let newSizes = item.sizes.filter((size) => !sizes.includes(size));
            let uniqueSizes = newSizes.filter((size, index) => newSizes.indexOf(size) === index);
            sizes.push(...uniqueSizes);
            return sizes
        }, []);
    }
    else
        return []
}

function getToggle(actives, setActives) {
    return (element) => {
        if (actives.includes(element))
            setActives(actives.filter((el) => el !== element));
        else
            setActives([...actives, element])
    };
}


export { Catalog };
