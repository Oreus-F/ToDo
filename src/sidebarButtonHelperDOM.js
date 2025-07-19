const displayContent = function(target, content){
    let data = target.getAttribute(`data-${content}`);
    data = data === 'true' ? false : true;
    target.setAttribute(`data-${content}`, data)
}

export {displayContent}