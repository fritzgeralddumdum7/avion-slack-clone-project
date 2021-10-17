export const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email)
}

export const isEmpty = (string) => {
    return !string ? true : false;
}

export const alignMessagesWithUser = (data, moment) => {
    let body = [];
    let processedMessages = [];
    let name = '';
    let image = '';
    let sender = '';

    // loop over response data
    for (let i = 0; i < data.length; i++) {
        let time = moment(data[i].created_at).format('LT');
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
                time = moment(data[i].created_at).format('LT');
                sender = data[i]['sender'].uid;
                // remove previous data to set newly added body
                processedMessages.pop();
            } else {
                body.push(data[i].body);
                name = data[i].name;
                image = data[i].image;
                time = moment(data[i].created_at).format('LT')
                sender = data[i]['sender'].uid;
            }
        } else {
            body.push(data[i].body);
            name = data[i].name;
            image = data[i].image;
            time = moment(data[i].created_at).format('LT');
            sender = data[i]['sender'].uid;
        }
        
        processedMessages.push({ 
            body, 
            name, 
            image, 
            time, 
            sender 
        });
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



export const setFakeInfo = (messages, moment, faker, Cookies) => {
    const fakedNameUser = faker.fake("{{name.firstName}} {{name.lastName}}");
    const fakedImageUser = faker.fake("{{image.avatar}}");

    const fakedNameReceiver = faker.fake("{{name.firstName}} {{name.lastName}}");
    const fakedImageReceiver = faker.fake("{{image.avatar}}");

    const fakeSender = {
        name: fakedNameUser,
        image: fakedImageUser
    }
    const fakeReceiver = {
        name: fakedNameReceiver,
        image: fakedImageReceiver
    }

    let recipient = null;
    let separateByDate = [];

    messages.forEach(item => {
        if (item['sender'].email === Cookies.get('uid')) {
            item.name = fakeSender.name;
            item.image = fakeSender.image;
        } else {
            item.name = fakeReceiver.name;
            item.image = fakeReceiver.image;
        }

        if (item['sender'].uid !== Cookies.get('uid') && isEmpty(recipient)) {
            fakeReceiver['uid'] = item['sender'].uid;
        }

        // set locale datetime
        let locale = moment(item.created_at).format('dddd, MMMM Do');
        const today = moment(moment().toDate()).format('dddd, MMMM Do');
        const yesterday = moment(moment().toDate()).subtract(1, 'days').format('dddd, MMMM Do');

        if (locale === today) {
            locale = (moment(item.created_at).calendar()).split(' at')[0];
        } else if (locale === yesterday) {
            locale = (moment(moment().toDate()).subtract(1, 'days').calendar()).split(' at')[0];
        }
        
        if (separateByDate.length === 0) {
            separateByDate.push({ 
                locale,
                convos: []
            });
        } else {
            const dateExist = separateByDate.some(date => date.locale === locale)
            if (!dateExist) {
                separateByDate.push({ 
                    locale,
                    convos: []
                });
            }
        }

        if (separateByDate[separateByDate.length - 1].locale === locale) {
            console.log(item)
            separateByDate[separateByDate.length - 1].convos.push(item);
        }
    })

    separateByDate.forEach(date => date.convos = alignMessagesWithUser(date.convos, moment));

    return {
        messages: separateByDate,
        recipient: fakeReceiver,
        sender: fakeSender
    };
}
