import FriendList from "./components/FriendList";
import SideBarMenu from "./components/SideBarMenu";
import style from "./styles/homePage.module.scss";
export default function Home() {
  return (
    <main className={style.wrapper}>
      <SideBarMenu />
      <p style={{ height: "1000px" }}>ducdzvcc</p>
      <FriendList />
    </main>
  );
}
