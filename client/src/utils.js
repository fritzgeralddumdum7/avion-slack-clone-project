export const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email)
}

export const isEmpty = (string) => {
    return !string ? true : false;
}

export const alignMessagesWithUser = (data) => {
    let body = [];
    let processedMessages = [];
    let name = '';
    let image = '';

    // loop over response data
    for (let i = 0; i < data.length; i++) {
        if (i !== 0) {
            // check if the current send is same with the previous one
            if (data[i]['sender'].email === data[i - 1]['sender'].email) {
                // push all body that belongs to current user
                body.push(
                    ...processedMessages[processedMessages.length - 1].body,
                    data[i].body
                );
                name = data[i].name;
                image = data[i].image;
                // remove previous data to set newly added body
                processedMessages.pop();
            } else {
                body.push(data[i].body);
                name = data[i].name;
                image = data[i].image;
            }
        } else {
            body.push(data[i].body);
            name = data[i].name;
            image = data[i].image;
        }
        
        processedMessages.push({ body, name, image });
        body = [];
    }

    return processedMessages;
}

// filter duplicate items and return a unique elements
export const filterToUnique = (array) => {
    let uniqueArr = [];
    array.forEach(item => {
        const result = uniqueArr.some(unique => item.id === unique.id);

        if (!result) {
            uniqueArr.push(item);
        }
    })

    return uniqueArr;
}
