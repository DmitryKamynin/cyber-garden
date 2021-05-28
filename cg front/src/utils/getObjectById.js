export const getObjectById = ({array, id}) => {
    return array.find((item) => item._id === id);
}