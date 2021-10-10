import React from 'react';

import ChannelMemberList from '../ChannelMemberList/ChannelMembersList';

import './PageHeader.scoped.css';

function PageHeader ({ 
    title, 
    buttonLabel, 
    handleButtonClick, 
    hasButton = true, 
    channelMemberList,
    showModal,
    usersNotOnChannel,
    handleClick
}) {
    return (
        <div>
            <header>
                <h3>{title}</h3>
                { hasButton &&
                    <button onClick={handleButtonClick}> {buttonLabel}</button>
                }
            </header>
            { 
                showModal && 
                <ChannelMemberList 
                    channelName={title}
                    memberList={channelMemberList}
                    usersNotOnChannel={usersNotOnChannel}
                    handleClick={handleClick}
                />
            }
        </div>    
    )
}

export default PageHeader;
