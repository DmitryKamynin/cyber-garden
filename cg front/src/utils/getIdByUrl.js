export const getIdByUrl = () => {
    const href = window.location.pathname;
    const hrefArray = href.split('/');
    return hrefArray[hrefArray.length - 1]
};