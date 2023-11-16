
const GetFavorite =  async (setAllUsers, ladyId, personalListArray) => {

    const ids = personalListArray;
    const banUsers = localStorage.getItem(`userBanIds-${ladyId}`);
    const storedInvites = localStorage.getItem(`userIds-${ladyId}`);

    if (ids.length > 0) {
        if (storedInvites && banUsers) {
            const parsedStoredInvites = JSON.parse(storedInvites);
            const parsedBanUsers = JSON.parse(banUsers);

            const idsAsObjects = ids.map(id => ({ id }));

            // Объединяю два массива и преобразовую их в Set для удаления дубликатов
            const combinedArray = [...parsedStoredInvites, ...idsAsObjects];
            const uniqueIdsSet = new Set(combinedArray.map(item => item.id));

            // Преобразовую Set обратно в массив уникальных объектов
            const uniqueIdsArray = [...uniqueIdsSet].map(id => ({ id }));

            if (parsedBanUsers) {
                const filteredUsers = uniqueIdsArray.filter(user => !parsedBanUsers.some(bannedUser => bannedUser.id === user.id));
                setAllUsers(filteredUsers);
            } else {
                setAllUsers(uniqueIdsArray);
            }

        } else {
            const idsAsObjects = ids.map(id => ({ id }));
            const parsedBanUsers = JSON.parse(banUsers);

            if (parsedBanUsers) {
                // Исключаем пользователей, чьи ID есть в banUsersId
                const bannedUserIds = parsedBanUsers.map(bannedUser => bannedUser.id);
                const filteredUsers = idsAsObjects.filter(user => !bannedUserIds.includes(user.id));
                setAllUsers(filteredUsers);
            } else {
                setAllUsers([...idsAsObjects]);
            }


        }

    }
}

export default GetFavorite;
