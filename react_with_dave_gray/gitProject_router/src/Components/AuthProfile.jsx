import React, { useState, useEffect } from 'react';

const AuthProfile = ({ username }) => {

    const [gitUserData, setGitUserData] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        const getGitUser = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                if (!response.ok)
                    throw new Error("Data can't be fetched");

                const data = await response.json();
                if (data) {
                    setGitUserData(data);
                    setLoading(false);
                }

            } catch (error) {
                setErrorMsg(error.message);
                console.log(error.message);
                setLoading(false);
            }

        };

        getGitUser();
    }, []);

    if (loading)
        return <h1>Loading....</h1>;

    if (errorMsg)
        return <h1>Error : {errorMsg}</h1>;


    return (
        <div className="user-profile-main-cont">
            <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>YOUR PROFILE</h2>
            <div className="top-cont">
                <img
                    src={gitUserData.avatar_url}
                    className="user-avatar-img"
                    alt="user-img"
                />{" "}
                <div className="name-cont">
                    <span>{gitUserData.login}</span>
                    <h2>{gitUserData.name}</h2>
                    <div>
                        <span style={{ display: "block" }}>
                            Company:{" "}
                            <span style={{ color: "purple", fontWeight: "700" }}>
                                {gitUserData.company}
                            </span>
                        </span>
                        <span>Public Repos: {gitUserData.public_repos}</span>
                    </div>
                    <h3>{gitUserData.location}</h3>
                    <div className="follow-cont">
                        <span className="followers">
                            Followers: {gitUserData.followers}
                        </span>
                        <span>Following: {gitUserData.following}</span>
                    </div>
                    <a
                        className="view-ongit-a"
                        href={gitUserData.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
            <div className="bottom-cont">
                <h3>{gitUserData.bio}</h3>
            </div>
        </div>
    );
};

export default AuthProfile;