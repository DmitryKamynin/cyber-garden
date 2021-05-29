import { TextRotateVerticalTwoTone } from "@material-ui/icons";

export const getObjectById = ({array, id}) => {
    return array.find((item) => item._id === id);
}

export const getIdByUrl = () => {
    const href = window.location.pathname;
    const hrefArray = href.split('/');
    return hrefArray[hrefArray.length - 1]
};

export const sortSchedule = (a, b) => {
    if(new Date(a.date_time) > new Date(b.date_time)) return 1;
    if(new Date(a.date_time) < new Date(b.date_time)) return -1;
    if(new Date(a.date_time) === new Date(b.date_time)) return 0;
}

export const futureTime = (minutes) => new Date(new Date().getTime() + minutes * 60 * 1000);