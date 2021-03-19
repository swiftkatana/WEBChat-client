import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ user }) => {

    const renderName = () => {
        if (!user) return null

        return user.firstName
    }
    return (
        <div>
            <h1>Hello {renderName()} </h1>
        </div>
    );

}
const mapStateToProps = ({ user }) => ({
    user,
})


export default connect(mapStateToProps, {})(Profile);