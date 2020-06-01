import jsonp from 'assets/js/jsonp';
import {jsonpOptions,TIMEOUT} from './config';
//获取数据
//https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/
//?api=mtop.taobao.detail.getdetail&ttid=2017%40taobao_h5_6.6.0&
//data=%7B%22itemNumId%22%3A%22555567044840%22%7D&appKey=12574478&dataType=jsonp&type=jsonp&v=6.0&callback=__jp1

//getProductSlider
export const getProductSlider = id => {
    const url='https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
    // api:'mtop.taobao.detail.getdetail',
    // ttid:'2017@taobao_h5_6.6.0',
    // data:`{"itemNumId":"${id}"}`,
    // appKey:'12574478',
    // dataType:'jsonp',
    // type:'jsonp',
    // v:'6.0',
    api:'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId"%3A"${id}"}`,
    appKey:12574478,
    dataType:'jsonp',
    type:'jsonp',
    v:'6.0'
}
    return jsonp(url,params,jsonpOptions).then(res=>{
        if(res.data){
            return res.data;
    }else{
    throw new Error('没有成功获取到数据！');
    }
    }).catch(err =>{
    if(err){
        console.log(err);
    }
    }).then(data =>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(data);
            },1000);
        })
    })
}

//getProductMain
export const getProductMain = id => {
    const url='https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
    api:'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId"%3A"${id}"}`,
    appKey:12574478,
    dataType:'jsonp',
    type:'jsonp',
    v:'6.0'
}
    return jsonp(url,params,jsonpOptions).then(res=>{
    res = res.data;
    if(res.apiStack && res.item){
        const apiStack = JSON.parse(res.apiStack[0].value);
        //整理api
        let datas = {}
        // 价钱
        datas.priceText = apiStack.price.price.priceText;
        // 销量
        datas.soldCount = apiStack.vertical.jhs.soldCount;
        // 主题
        datas.title = apiStack.item.title;
        // 快递
        datas.postage = apiStack.delivery.postage;
        // 月销量
        datas.sellCount = apiStack.item.sellCount;
        // 商家的位置
        datas.from = apiStack.delivery.from;
        return datas;
    }
    else{
    throw new Error('没有成功获取到数据！');
    }
    }).catch(err =>{
    if(err){
        console.log(err);
    }
    }).then(data =>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(data);
            },1000);
        })
    })
}

//getProductComment
export const getProductComment = id =>{
    const url='https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
    api:'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId"%3A"${id}"}`,
    appKey:12574478,
    dataType:'jsonp',
    type:'jsonp',
    v:'6.0'
    }
    return jsonp(url,params,jsonpOptions).then(res =>{
        res=res.data
        if(res.rate){
            let comment = {};
            return comment = res.rate;
        }else{
            throw new Error('没有成功获取到数据！');
        }
    }).catch(err =>{
        if(err){
            console.log(err)
        }
    }).then(data =>{
        return new Promise(resolve =>{
            setTimeout(() =>{
                resolve(data)
            },1000)
        }) 
    })
}

//getProductShop
export const getProductShop = id =>{
    const url='https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
    api:'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId"%3A"${id}"}`,
    appKey:12574478,
    dataType:'jsonp',
    type:'jsonp',
    v:'6.0'
    }
    return jsonp(url,params,jsonpOptions).then(res =>{
    res=res.data
    if(res.seller){
        let shop ={};
        // 商店图标
        shop.shopIcon = res.seller.shopIcon;
        // 商店名字
        shop.shopName = res.seller.shopName;
        // 商店小天猫
        shop.creditLevelIcon = res.seller.creditLevelIcon;
        //商店详情
        shop.evaluates = res.seller.evaluates;
        //商店地址
        shop.taoShopUrl= res.seller.taoShopUrl;
        return shop;
    }else{
        throw new Error('没有成功获取到数据！');
    }
    }).catch(err =>{
    if(err){
        console.log(err)
    }
    }).then(data =>{
    return new Promise(resolve =>{
    setTimeout(() =>{
        resolve(data)
    },1000)
}) 
})
}


//DetailText
export const getProductDetailText = id => {
    const url='https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/';
    const params = {
    // api:'mtop.taobao.detail.getdetail',
    // ttid:'2017@taobao_h5_6.6.0',
    // data:`{"itemNumId":"${id}"}`,
    // appKey:'12574478',
    // dataType:'jsonp',
    // type:'jsonp',
    // v:'6.0',
    api:'mtop.taobao.detail.getdetail',
    ttid: '2017@taobao_h5_6.6.0',
    data: `{"itemNumId"%3A"${id}"}`,
    appKey:12574478,
    dataType:'jsonp',
    type:'jsonp',
    v:'6.0'
}
    return jsonp(url,params,jsonpOptions).then(res=>{
        if(res.data){
            return res.data;
    }else{
    throw new Error('没有成功获取到数据！');
    }
    }).catch(err =>{
    if(err){
        console.log(err);
    }
    }).then(data =>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(data);
            },1000);
        })
    })
}

//Detail
export const getProductDetail = id => {
    const url=id;
    const params = {
    }
    return jsonp(url,params,jsonpOptions).then(res=>{
        if(res.data){
            console.log(res.data)
            return res.data;
    }else{
    throw new Error('没有成功获取到数据！');
    }
    }).catch(err =>{
    if(err){
        console.log(err);
    }
    }).then(data =>{
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve(data);
            },1000);
        })
    })
}