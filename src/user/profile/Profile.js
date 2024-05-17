import React from "react";
import "./Profile.css";
import { useGetAddressesQuery } from "../../redux/services/apiSlice";

function Profile(props) {
  const { currentUser } = props;
  const { data, isError, isLoading } = useGetAddressesQuery();

  return (
    <div>
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {currentUser.imageUrl ? (
                <div>
                  <img src={currentUser.imageUrl} alt={currentUser.name} />
                </div>
              ) : (
                <div className="text-avatar">
                  <span>{currentUser.name && currentUser.name[0]}</span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{currentUser.name}</h2>
              <p className="profile-email">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
