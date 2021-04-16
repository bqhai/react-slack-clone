import firebase from '../../firebase';
import React from 'react';
import { Dropdown, Grid, Header, Icon } from 'semantic-ui-react';


class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser
    }

    dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avartar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        }
    ];

    handleSignOut = () => {
        firebase.auth().signOut().then(() => console.log('Sign out'));
    }

    render() {
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code'></Icon>
                            <Header.Content>
                                DevChat
                            </Header.Content>
                        </Header>
                    </Grid.Row>
                    {/* User Dropdown */}
                    <Header style={{ padding: '0.25em' }} as='h4' inverted>
                        <Dropdown
                            trigger={<span>{this.state.user.displayName}</span>}
                            options={this.dropdownOptions()}>
                        </Dropdown>
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;