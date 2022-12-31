import {
  Container,
  Title,
  UserInfoContainer,
  Bio,
  GitHubLink,
  AccountInfo,
} from "./styles";
import { NavBlock } from "../../components/nav-block";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

import { FaGithub } from "react-icons/fa";

import { api } from "../../lib/api/axios";

export type UserInfoType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export function Home() {
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  async function fetchUserInformation() {
    const userInformation = await api.get(
      "/users/Pedro-Augusto-Barbosa-Aparecido"
    );

    setUserInfo(userInformation.data);
  }

  useEffect(() => {
    fetchUserInformation();
  }, []);

  console.log(userInfo);

  return (
    <Container>
      <NavBlock>
        <img src={userInfo?.avatar_url} alt={""} />
        <UserInfoContainer>
          <Title>{userInfo?.login.replaceAll("-", " ")}</Title>
          <Bio>{userInfo?.bio}</Bio>
          <AccountInfo>
            <div>
              <FaGithub size={20} />
              <span>{userInfo?.name}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faBuilding} />
              <span>{userInfo?.company}</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faUserGroup} />
              <span>{userInfo?.followers} seguidores</span>
            </div>
          </AccountInfo>
          <GitHubLink href={userInfo?.html_url}>
            GITHUB
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </GitHubLink>
        </UserInfoContainer>
      </NavBlock>
    </Container>
  );
}
