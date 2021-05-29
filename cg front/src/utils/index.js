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


export const tables = [
    {
        id: 1,
        x : 66,
        y : 98,
    },
    {
        id: 2,
        x : 66,
        y : 191,
    },
    {
        id: 3,
        x : 66,
        y : 284,
    },
    {
        id: 4,
        x : 39,
        y : 600,
    },
    {
        id: 5,
        x : 39,
        y : 674,
    },
    {
        id: 6,
        x : 39,
        y : 756,
    },
    {
        id: 7,
        x : 141,
        y : 191,
    },
    {
        id: 8,
        x : 141,
        y : 289,
    },
    {
        id: 9,
        x : 141,
        y : 363,
    },
    {
        id: 10,
        x : 141,
        y : 462,
    },
    {
        id: 11,
        x : 141,
        y : 561,
    },
    {
        id: 12,
        x : 141,
        y : 667,
    },
    {
        id: 13,
        x : 141,
        y : 748,
    },
    {
        id: 14,
        x : 92,
        y : 833,
    },
    {
        id: 15,
        x : 260,
        y : 191,
    },
    {
        id: 16,
        x : 260,
        y : 289,
    },
    {
        id: 17,
        x : 260,
        y : 377,
    },
    {
        id: 18,
        x : 260,
        y : 470,
    },
    {
        id: 19,
        x : 260,
        y : 565,
    },
    {
        id: 20,
        x : 260,
        y : 653,
    },
    {
        id: 21,
        x : 297,
        y : 81,
    },
    {
        id: 22,
        x : 340,
        y : 145,
    },
    {
        id: 23,
        x : 340,
        y : 321,
    },
    {
        id: 24,
        x : 340,
        y : 414,
    },
    {
        id: 25,
        x : 340,
        y : 500,
    },
    {
        id: 26,
        x : 340,
        y : 594,
    },
    {
        id: 27,
        x : 285,
        y : 743,
    },
    {
        id: 28,
        x : 340,
        y : 816,
    },
]