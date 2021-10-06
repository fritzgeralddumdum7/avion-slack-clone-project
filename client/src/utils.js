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

export const serializer = (array, type) => {
    let serializedArray = [];
    
    if (type === 'user') {
        array.forEach(item => {
            serializedArray.push({ 
                value: item.id,
                email: item.email,
                text: item.name,
                image: item.image,
                type: 'user'
            })
        })
    } else if (type === 'channel') {
        array.forEach(item => {
            serializedArray.push({ 
                value: item.id,
                text: item.name,
                type: 'channel'
                
            })
        })
    } else if (type === 'all') {
        array.forEach(item => {
            if (item.hasOwnProperty('email')) {
                serializedArray.push
                ({ 
                    value: item.id,
                    text: item.name,
                    email: item.email,
                    image: item.image,
                    type: 'user'
                })
            } else {
                serializedArray.push
                ({ 
                    value: item.id,
                    email: '',
                    text: item.name,
                    type: 'channel'
                })
            }
        })
    }
    return serializedArray;
}
