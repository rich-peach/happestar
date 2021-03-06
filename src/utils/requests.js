import {useEffect, useState} from 'react';
import {request_to_instagram} from "./instagram";


const LIMIT_OF_INSTAGRAM_PHOTOS = 18;

export async function get_instagram_photos() {
    try {
        console.log('here');
        let response = await request_to_instagram();
        let images = response.data.map((element) => ({ link: element.link, url: element.images.standard_resolution.url }));
        return images.splice(0, LIMIT_OF_INSTAGRAM_PHOTOS);
    }
    catch (e) {
        console.error(e);
    }
}

 export async function get_attention_photos() {
    try {
        return attentions;
    }
    catch (e) {
        console.error(e);
    }
}

 export async function get_banners() {
    try {
        return banners;
    }
    catch (e) {
        console.error(e);
    }
 }

 export async function get_features() {
     try {
         return features;
     }
     catch (e) {
         console.error(e);
     }
 }

 export const get_items = async () => {
    let result =[];
    let sizes = ['35 - 39', '40 - 45'];
    let response = [];
    let tags = ['Серый', 'Черный', 'Белый', 'Красный', 'Оранжевый', 'Желтый', 'Зеленый', 'Розовый', 'Синий', 'Разноцветный'];
    let itemss = await fetch ('/php/tovarList.php')
         .then(function(response){ return response.json(); })
         .then(function(data) {
             result = data;
         }).catch(reason => console.log(reason));
    for (let j = 0; j < result.length; j++) {
        let parent = result[j];
        console.log(parent)
        response.push({
            id: parent.id,
            article: parent.article,
            src: parent.photoMain,
            name: parent.name,
            cost: parent.price,
            new: parent.new,
            discount: 15,
            prev_cost: parent.price,
            sizes: sizes,
            status: parent.new,
            tags: [tags[parent.color - 1]]
         });
     }
     return  response;
};

export const useFetch = (fetchCall, defaultVal) => {
     const [response, setResponse] = useState(defaultVal);

     async function getData() {
         const res = await fetchCall();
         if (res !== undefined)
             setResponse(res);
     }

     useEffect(() => {
         getData();
     }, [false]);

     return response;
};

const features = [
    {
        class: 'feature-1',
        text: 'Курьерская доставка по всей России'
    },
    {
        class: 'feature-2',
        text: 'Несколько размеров на выбор и бесплатная примерка'
    },
    {
        class: 'feature-3',
        text: 'Удобные способы оплаты: онлайн или при получении'
    },
    {
        class: 'feature-4',
        text: 'Возврат товара в течение 14 дней'
    }
]

const banners = [
    {
        src: require('../image/banner_1.jpg'),
        text: 'new',
        link: '/catalog'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'sale',
        link: '/catalog'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'best',
        link: '#'
    },
    {
        src: require('../image/banner_1.jpg'),
        text: 'feature',
        link: '#'
    },
    {
        src: require('../image/banner_1.jpg'),
        text: 'new',
        link: '#'
    },
    {
        src: require('../image/banner_2.jpg'),
        text: 'sale',
        link: '#'
    }
];

const attentions = [
    {
        src: require('../image/attention_1.jpg'),
        text: 'Идеальная пара\n твоему\n настроению'
    },
    {
        src: require('../image/attention_2.jpg'),
        text: 'Идеальная пара\n твоему\n настроению'
    }
];

export const STATUS = Object.freeze({
    NONE: 0,
    NEW: 1,
    SELL: 2
});
