// eslint-disable-next-line import/prefer-default-export
export const getDate = (publishedAt) => {
    const date = new Date(publishedAt);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
