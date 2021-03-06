import './index.sass'
import React, {useState} from 'react';
import {ItemCardPack} from "../ItemCardPack";


const CatalogListPack = ({ items, activeTags, activeSizes }) => {

    const sort = ['name', 'cost'];
    let [sort_type, changeSort] = useState([]);

     let activeItems = items.filter((item) => {
         if(!activeTags.includes(...item.tags) && activeTags.length !== 0)
             return false;
         if(!item.sizes.includes(...activeSizes) && activeSizes.length !== 0)
             return false;

         return true;
     });


     const changeSorts = (type) => {
         let oder = "";

         if (type === "name") {
             if (type === sort_type[0]) {
                 items = items.reverse();
                 oder = 'desc';
             } else {
                 items = items.sort((a, b) => a.name > b.name ? 1 : -1);
                 oder = 'asc';
             }
         } else {
             if (type === sort_type[0]) {
                 items = items.reverse();
                 oder = 'desc';
             } else {
                 items = items.sort((a, b) => a.cost > b.cost ? 1 : -1);
                 oder = 'asc';
             }
         }
         changeSort(sort_type = [type, oder]);
    }

    return (
        <div className='content  content--indent-mt'>
            <div className='sorting'>
                <i className="_show_filters"></i>
                <ul className="ul _lm" data-title="Сортировать по:">
                    {
                        sort.map((size, key) =>  {
                        let className = sort_type[0] === size ? 'active' : '';
                        let text = size === "name" ? 'названию' : 'цене';
                        return <li onClick={() => changeSorts(size)} key={key} className={className}><span>по</span> {text}</li>
                    } )}
                </ul>
            </div>
            <div className="list goodsContainer _2c">
                {activeItems.map((item, key) => <ItemCardPack item={item} key={key}/>)}
            </div>
        </div>
    )
};


export { CatalogListPack };
