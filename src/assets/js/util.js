//节流函数，控制触发的频率，提高性能
export const debounce = (func , delay = 400) => {
    let timer = null;

    return function(...args){
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this,args);
        },delay)
    }
}