import React from 'react';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Container from '../../shared/Container/Container';
import Sidebar from '../../shared/Sidebar/Sidebar';
import Header from '../../shared/Header/Header';
import Search from '../../shared/Header/component/Search';
import Disclaimer from '../../shared/Disclaimer/Disclaimer';
import People from '../../shared/People/People';

function Shared () {
    return (
        <div className="container">
            
            <div>
                <Disclaimer 
                text="Disclaimer: This app is for educational purposes only." />
            </div>
            <h1>List of shared components</h1>
            <div>
                <People 
                image='https://randomuser.me/api/portraits/women/90.jpg'
                name='Potpot Juan'
                bio='Slack User'
                />
                <People
                
                name='Rody Dyro' 
                bio='Owner of Chena'
                />
                <People
                image='https://randomuser.me/api/portraits/women/90.jpg'
                name='Juan Too'
                bio='Co-Owner of Chena'
                 />
            </div>
            <div style={{width: '300px'}}>
                <h3>Input</h3>
                <Input 
                    placeholder='Email'
                    hasError={false}
                    type='text'
                    hasIcon={true}
                    faIcon='envelope'
                />
                <Input 
                    placeholder='Password'
                    hasError={true}
                    type='password'
                    faIcon='lock'
                />
                <Input 
                    placeholder='Normal input'
                    type='text'
                />
            </div>
            <div style={{width: '300px'}}>
                <h3>Button</h3>
                <Button 
                    text='Login'
                />
            </div>
            <div>
                <h3>Container</h3>
                <Container>
                    <Input 
                        placeholder='Email'
                        hasError={false}
                        type='text'
                        hasIcon={true}
                        faIcon='envelope'
                    />
                    <Input 
                        placeholder='Password'
                        hasError={true}
                        type='password'
                        hasIcon={true}
                        faIcon='lock'
                    />
                    <Button 
                        text='Login'
                    />
                </Container>
            </div>
            <div style={{width: '300px'}}>
                <h3>Sidebar</h3>
                <Sidebar />
            </div>
            <div>
                <h3>Search</h3>
                <Search placeholder={'Insert placeholder here'} />
            </div>
            <div>
                <h3>Header</h3>
                <Header />
            </div>
        </div>
    )
}

export default Shared;
