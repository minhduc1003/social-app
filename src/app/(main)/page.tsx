import FriendList from "./components/FriendList";
import SideBarMenu from "./components/SideBarMenu";
import AddNewFeed from "./components/homePage/AddNewFeed";
import WrapMainLayout from "./components/homePage/WrapMainLayout";
export default function Home() {
  return (
    <WrapMainLayout>
      <SideBarMenu />
      {/* <p style={{ height: "1000px" }}>ducdzvcc</p> */}
      <section>
        <AddNewFeed></AddNewFeed>
      </section>
      <FriendList />
    </WrapMainLayout>
  );
}
