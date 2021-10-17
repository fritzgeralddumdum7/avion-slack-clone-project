import React from 'react';

import Image from '../../Image/Image';

import './SearchList.scoped.css'

function SearchList ({ 
    users, 
    handleSelectUser
}) {

    const SearchListItem = ({ email, image, user }) => {
        const styles = { borderRadius: '5px' }
        return (
            <div className="item d-flex flex-row align-middle" onClick={() => handleSelectUser(user)}>
                <Image 
                    width={25}
                    source={image}
                    customStyle={styles}
                />
                <label>{ email }</label>
            </div>
        );
    }

    const NoResultsFound = () => {
        return (
            <div className="item no-result d-flex flex-row align-middle">
                <label>No items</label>
            </div>
        )
    }

    return (
        <div className="search-list">
            {
                users.length ?
                    users.map((user, i) => {
                        return <SearchListItem 
                            key={i}
                            email={user.uid}
                            image={user.image}
                            name={user.name}
                            handleSelectUser={handleSelectUser}
                            user={user}
                        />
                    }) : <NoResultsFound />
            }
        </div>
    )
}

export default SearchList;
